import { Router } from 'express';
import { query } from '../config/db.config.js';
const router = Router();

router.get('/:idprj', async (req, res) => {
    const idprj = req.params.idprj;
    try {
        const sql = 'SELECT * FROM TB_VOCABULO WHERE VOC_PRJID = ?';
  
      const rows = await query(sql, [idprj]);
      // projeto existe?
      if (rows.length === 0) {
        return res.status(404).json({ message: 'vocábulos não encontrados' });
      }
  
      // enviando resultado no json
      res.json(rows);
  
    } catch (error) {
      console.error('Erro ao carregar vocábulos:', error);
      res.status(500).json({ message: 'Um erro ocorreu ao carregar vocáubulos do projeto' });
    }
  });

router.post('/', async (req, res) => {
    const { VOC_PRJID: idprj, VOC_ROMANIZACAO: spelling, VOC_TRANSCRICAO: transcription } = req.body;
    try{
        
        // Basic validation
        if (!spelling || !transcription) {
            return res.status(400).json({ error: 'Romanização e transcrição são necessárias' });
        }

        const sql = 'INSERT INTO TB_VOCABULO (VOC_PRJID, VOC_ROMANIZACAO, VOC_TRANSCRICAO) VALUES (?, ?, ?)';
        const values = [idprj, spelling, transcription];
        await query(sql, values);
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    }
    catch (error) {
        console.error('Erro ao inserir vocáublo:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao inserir vocábulo ao projeto.' });
    }
});

router.put('/:id', async (req, res) => {
    const wordId = req.params.id;
    const { VOC_PRJID: idprj, VOC_ROMANIZACAO: spelling, VOC_TRANSCRICAO: transcription } = req.body;

    try {
        const sql = `
            UPDATE TB_VOCABULO
            SET VOC_ROMANIZACAO = ?, VOC_TRANSCRICAO = ?, VOC_PRJID = ?
            WHERE VOC_ID = ?;
        `;
        const values = [idprj, spelling, transcription, wordId];
        await query(sql, values);

        if (results[0].affectedRows === 0) {
            return res.status(404).json({ error: 'Vocábulo não encotnrado.' });
        }

        res.status(200).json({ message: 'Vocábulo editado com sucesso.' });
    } catch (error) {
        console.error('Error na edição do vocábulo:', error);
        res.status(500).json({ error: 'Um erro ocorreu na edição.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM TB_VOCABULO WHERE VOC_ID = ?';

    try {
        const results = await query(sql, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Vocábulo não encontrado.' });
        }
        
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao remover vocábulo:', error);
        res.status(500).json({ error: 'Um erro ocorreu durante a remoção.' });
    }
});

export default router;