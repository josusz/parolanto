import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config';

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

export default router;