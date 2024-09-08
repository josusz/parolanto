import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config.js';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

//teste de método GET
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM TB_USUARIO';
    query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro no servidor');
            return;
        }
        res.json(results);
    });
});

//validações de usuário
const validaUsuario = [
    check('nomeUsuario')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome.')
        .isLength({ min: 3 }).withMessage('O nome do usuário deve ter ao menos 3 caracteres.')
        .isLength({ max: 100 }).withMessage('O nome do usuário deve ter no máximo 100 caracteres.'),
    check('emailUsuario')
        .not().isEmpty().trim().withMessage('O e-mail é obrigatório.')
        .isLowercase().withMessage('O e-mail não pode ter MAIÚSCULOS.')
        .isEmail().withMessage('O e-mail deve ser válido.')
        /*.custom(async (value, { req }) => {
            //consulta SQL para verificar se o e-mail já existe no banco de dados MySQL
            const sql = 'SELECT * FROM TB_USUARIO WHERE USR_EMAIL = ?';
            const results = await query(sql, [value]);
            //verifica se o e-mail já existe e se não é uma atualização de um usuário existente
            if (results.length > 0 && !req.params.id) {
                return Promise.reject(`O email ${value} já existe!`);
            }
        })*/,
    check('senhaUsuario')
        .not().isEmpty().trim().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1
        }).withMessage('A senha informada não é segura. Informe no mínimo 1 caractere maiúsculo, 1 caractere minúsculo, 1 número e 1 caractere especial.'),
    check('senhaUsuarioConfirmacao')
        .not().isEmpty().trim().withMessage('É obrigatório confirmar a senha.')
        .custom((value, { req }) => {
            if (value !== req.body.senhaUsuario) {
                throw new Error('A confirmação de senha deve ser igual à senha.');
            }
            return true;
        })
];

//POST de usuário
router.post('/', validaUsuario, async (req, res) => {
    const schemaErrors = validationResult(req);
    if (!schemaErrors.isEmpty()) {
        return res.status(403).json({
            errors: schemaErrors.array()
        });
    } else {
        //criptografia da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.senhaUsuario, salt);

        //SQL para inserir o usuário
        const sql = 'INSERT INTO TB_USUARIO (USR_EMAIL, USR_SENHA, USR_NOME) VALUES (?, ?, ?)';
        const values = [req.body.emailUsuario, hashedPassword, req.body.nomeUsuario];

        query(sql, values, (err, result) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                return res.status(400).json({ error: 'Erro ao cadastrar o usuário' });
            }
            //resposta de sucesso com uma mensagem
            res.status(201).json({ message: 'Selecione "Autenticar-se" para explorar a Parolanto.', result });
        });
    }
});

export default router;