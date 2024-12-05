import { Router } from 'express';
import { query } from '../config/db.config.js';
const router = Router();

router.get('/list:idprj', async (req, res) => {
    const idprj = req.params.idprj;
    try {
        const sql = 'SELECT * FROM TB_REGRA WHERE REG_PRJID = ?';
  
      const rows = await query(sql, [idprj]);
      // vocábulo existe?
      if (rows.length === 0) {
        return res.status(200).json([]);
      }
  
      // enviando resultado no json
      res.json(rows);
  
    } catch (error) {
      console.error('Erro ao carregar regras:', error);
      res.status(500).json({ message: 'Um erro ocorreu ao carregar regras do projeto' });
    }
  });

router.post('/', async (req, res) => {
    const { REG_PRJID: idprj, REG_TITULO: title, REG_CORPO: body } = req.body;
    try{
        
        // Basic validation
        if (!title || !body) {
            return res.status(400).json({ error: 'Campos não rpeenchidos' });
        }

        const sql = 'INSERT INTO TB_REGRA (REG_PRJID, REG_TITULO, REG_CORPO) VALUES (?, ?, ?)';
        const values = [idprj, title, body];
        await query(sql, values);

        const fetchSql = 'SELECT * FROM TB_REGRA WHERE REG_ID = LAST_INSERT_ID()';
        const [newObject] = await query(fetchSql);

        // Return the newly created object
        return res.status(201).json(newObject);
    }
    catch (error) {
        console.error('Erro ao inserir regra:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir regra ao projeto.' });
    }
});

router.put('/:id', async (req, res) => {
    const regId = req.params.id;
    const { REG_PRJID: idprj, REG_TITULO: title, REG_CORPO: body } = req.body;

    try {
        const sql = `
            UPDATE TB_REGRA
            SET REG_TITULO = ?, REG_CORPO = ?, REG_PRJID = ?
            WHERE REG_ID = ?;
        `;
        const values = [title, body, idprj, regId];

        const result = await query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Regra não encontrada.' });
        }

        res.status(200).json({ message: 'Regra editada com sucesso.' });
    } catch (error) {
        console.error('Error na edição da regra:', error);
        res.status(500).json({ error: 'Um erro ocorreu na edição.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const sql = 'DELETE FROM TB_REGRA WHERE REG_ID = ?';

    try {
        const results = await query(sql, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Regra não encontrada.' });
        }
        
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao remover Regra:', error);
        res.status(500).json({ error: 'Um erro ocorreu durante a remoção.' });
    }
});

export default router;