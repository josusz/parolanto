import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config.js';

router.get('/conlangs', async (req, res) => {
    try {
        const sql = 'SELECT * FROM TB_PROJETO';
        // Usa a função query que você exportou
        const rows = await query(sql);
        
        // Envia os resultados como resposta
        res.json(rows);
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados do banco de dados' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const sql = `
        SELECT 
          p.PRJ_NOME, 
          p.PRJ_DESCRICAO, 
          p.PRJ_ID,
          p.PRJ_FONOTATICA, 
          u.USR_NOME, 
          u.USR_ID
        FROM 
          TB_PROJETO p
        INNER JOIN 
          TB_USUARIO u ON p.PRJ_USRID = u.USR_ID
        WHERE 
          p.PRJ_ID = ?
      `;
  
      const rows = await query(sql, [id]);
      // projeto existe?
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Projeto não encontrado' });
      }
  
      // enviando resultado no json
      res.json(rows[0]);
  
    } catch (error) {
      console.error('Erro ao carregar projeto:', error);
      res.status(500).json({ message: 'Um erro ocorreu ao detalhar projeto' });
    }
  });

export default router;