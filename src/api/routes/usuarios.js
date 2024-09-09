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
        .isAlpha('pt-BR', { ignore: ' ' }).withMessage('Informe apenas texto no nome.')
        .isLength({ min: 3 }).withMessage('O nome do usuário deve ter ao menos 3 caracteres.')
        .isLength({ max: 100 }).withMessage('O nome do usuário deve ter no máximo 100 caracteres.')
        .custom(async (value, { req }) => {
            try {
                const sql = 'SELECT * FROM TB_USUARIO WHERE USR_NOME = ?';
                const results = await query(sql, [value]);
                console.log('Resultados da consulta:', results); //log para depuração

                if (results.length > 0 && !req.params.id) {
                    return Promise.reject(`O nome ${value} já está em uso. Por favor, escolha outro.`);
                }
            } catch (error) {
                console.error('Erro ao verificar nome de usuário:', error);
                return Promise.reject('Erro ao verificar o nome de usuário.');
            }
        }),
    check('emailUsuario')
        .not().isEmpty().trim().withMessage('O e-mail é obrigatório.')
        .isLowercase().withMessage('O e-mail não pode ter MAIÚSCULOS.')
        .isEmail().withMessage('O e-mail deve ser válido.')
        .custom(async (value, { req }) => {
            try {
                console.log('Verificando e-mail:', value); //log para depuração
                const sql = 'SELECT * FROM TB_USUARIO WHERE USR_EMAIL = ?';
                const results = await query(sql, [value]);
                console.log('Resultados da consulta:', results); //log para depuração

                if (results.length > 0 && !req.params.id) {
                    return Promise.reject(`O e-mail ${value} já existe!`);
                }
            } catch (error) {
                console.error('Erro ao verificar e-mail:', error);
                return Promise.reject('Erro ao verificar o e-mail.');
            }
        }),
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
        try {
            if (!req.body || !req.body.senhaUsuario || !req.body.emailUsuario || !req.body.nomeUsuario) {
                return res.status(400).json({ error: 'Dados obrigatórios não foram fornecidos.' });
            }

            //criptografia da senha
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.senhaUsuario, salt);

            //SQL para inserir o usuário
            const sql = 'INSERT INTO TB_USUARIO (USR_EMAIL, USR_SENHA, USR_NOME) VALUES (?, ?, ?)';
            const values = [req.body.emailUsuario, hashedPassword, req.body.nomeUsuario];

            await query(sql, values); //versão promise da função query
            return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
        } catch (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(400).json({ error: 'Erro ao cadastrar o usuário' });
        }
    }
});

export default router;