import { Router } from 'express';
import { query } from '../config/db.config.js';
const router = Router();

router.get('/list:idprj', async (req, res) => {
    const idprj = req.params.idprj;
    try {
        const sql = 'SELECT * FROM TB_EXEMPlO WHERE EXE_PRJID = ?';
  
      const rows = await query(sql, [idprj]);
      // vocábulo existe?
      if (rows.length === 0) {
        return res.status(200).json([]);
      }
  
      // enviando resultado no json
      res.json(rows);
  
    } catch (error) {
      console.error('Erro ao carregar exemplos:', error);
      res.status(500).json({ message: 'Um erro ocorreu ao carregar exemplos do projeto' });
    }
  });

router.post('/', async (req, res) => {
    const { EXE_PRJID: idprj, EXE_TITULO: title, EXE_CORPO: body } = req.body;
    try{
        
        // Basic validation
        if (!title || !body) {
            return res.status(400).json({ error: 'Campos não rpeenchidos' });
        }

        const sql = 'INSERT INTO TB_EXEMPLO (EXE_PRJID, EXE_TITULO, EXE_CORPO) VALUES (?, ?, ?)';
        const values = [idprj, title, body];
        await query(sql, values);

        const fetchSql = 'SELECT * FROM TB_EXEMPLO WHERE EXE_ID = LAST_INSERT_ID()';
        const [newObject] = await query(fetchSql);

        // Return the newly created object
        return res.status(201).json(newObject);
    }
    catch (error) {
        console.error('Erro ao inserir exemplo:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir exemplo ao projeto.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const sql = 'DELETE FROM TB_EXEMPLO WHERE EXE_ID = ?';

    try {
        const results = await query(sql, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Exemplo não encontrado.' });
        }
        
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao remover Exemplo:', error);
        res.status(500).json({ error: 'Um erro ocorreu durante a remoção.' });
    }
});

export default router;