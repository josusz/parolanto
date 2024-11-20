import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config.js';
import { output } from '@angular/core';

router.get('/count:idvoc', async (req, res) => {
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

  router.get('/list:idvoc', async (req, res) => {
    const idprj = req.params.idvoc;
    try {
        const sql = 'SELECT * FROM TB_DEFINICAO WHERE DEF_VOCID = ?';
  
      const rows = await query(sql, [idprj]);
      // definição existe?
      if (rows.length === 0) {
        return res.status(200).json([]);
      }
  
      // enviando resultado no json
      res.json(rows);
  
    } catch (error) {
      console.error('Erro ao carregar definições:', error);
      res.status(500).json({ message: 'Um erro ocorreu ao carregar definições do vocábulo' });
    }
  });

router.post('/', async (req, res) => {
    const { DEF_CLASSE: part, DEF_DESCRICAO: desc, DEF_VOCID: vocid } = req.body;
    try{
        
        // Basic validation
        if (!part || !desc) {
            return res.status(400).json({ error: 'Classe e descrição são necessárias' });
        }

        const sql = 'INSERT INTO TB_DEFINICAO (DEF_VOCID, DEF_CLASSE, DEF_DESCRICAO) VALUES (?, ?, ?)';
        const values = [vocid, part, desc];
        await query(sql, values);
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao inserir definição:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir definição ao vocábulo.' });
    }
});

router.put('/:id', async (req, res) => {
    const defId = req.params.id;
    const { DEF_CLASSE: part, DEF_DESCRICAO: desc, DEF_VOCID: vocid } = req.body;

    try {
        const sql = `
            UPDATE TB_DEFINICAO
            SET DEF_CLASSE = ?, DEF_DESCRICAO = ?, DEF_VOCID = ?
            WHERE DEF_ID = ?;
        `;
        const values = [part, desc, vocid, defId];

        const result = await query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Definição não encontrada.' });
        }

        res.status(200).json({ message: 'Definição editada com sucesso.' });
    } catch (error) {
        console.error('Error na edição da definição:', error);
        res.status(500).json({ error: 'Um erro ocorreu na edição.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM TB_DEFINICAO WHERE DEF_ID = ?';

    try {
        const results = await query(sql, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Definição não encontrada.' });
        }
        
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao remover definição:', error);
        res.status(500).json({ error: 'Um erro ocorreu durante a remoção.' });
    }
});


export default router;