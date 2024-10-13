import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config.js';

router.get('/vocab', async (req, res) => {
    try {
        const sql = 'SELECT * FROM TB_VOCABULO';
        // Usa a função query que você exportou
        const rows = await query(sql);
        
        // Envia os resultados como resposta
        res.json(rows);
    } catch (error) {
        console.error('Erro ao executar a query:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados do banco de dados' });
    }
});

router.post('/', (req, res) => {
    const { spelling, transcription, definition, partOfSpeech } = req.body;

    // Basic validation
    if (!spelling || !transcription) {
        return res.status(400).json({ error: 'Spelling and transcription are required.' });
    }

    const query = 'INSERT INTO words (spelling, transcription, definition, part_of_speech) VALUES (?, ?, ?, ?)';
    
    db.execute(query, [spelling, transcription, definition, partOfSpeech])
        .then(([results]) => {
            res.status(201).json({
                id: results.insertId, // Return the ID of the newly created word
                spelling,
                transcription,
                definition,
                partOfSpeech
            });
        })
        .catch((error) => {
            console.error('Error inserting word:', error);
            res.status(500).json({ error: 'An error occurred while adding the word.' });
        });
});

// 2. Remove a word
router.delete('/:id', (req, res) => {
    const wordId = req.params.id;

    const query = 'DELETE FROM words WHERE id = ?';

    db.execute(query, [wordId])
        .then(([results]) => {
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Word not found.' });
            }
            res.status(204).send(); // No content
        })
        .catch((error) => {
            console.error('Error deleting word:', error);
            res.status(500).json({ error: 'An error occurred while deleting the word.' });
        });
});

export default router;