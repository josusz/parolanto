import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config.js';

router.get('/:idvoc', async (req, res) => {
    const id = req.params.idvoc;
    try {
      const sql = `
        SELECT COUNT(*) AS contagem
        FROM TB_DEFINICAO
        WHERE DEF_VOCID = ?;
        `;
  
      const rows = await query(sql, [id]);
  
      // enviando resultado no json
      res.json(rows[0].contagem);
  
    } catch (error) {
      console.error('Erro ao contar definições do vocábulo:', error);
      res.status(500).json({ message: 'Um erro ocorreu na contagem de definições' });
    }
  });

export default router;