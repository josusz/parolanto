import { Router } from 'express';
import { query } from '../config/db.config.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/', auth, async (req, res) => {
  const { idProjeto, conteudo } = req.body;
  const idUsuario = req.usuario.id; //obtido do middleware auth.js

  try {
    if (!idProjeto || !conteudo) {
      return res.status(400).json({ message: 'Dados obrigatórios não foram fornecidos.' });
    }

    const sql = 'INSERT INTO TB_COMENTARIO (COM_USRID, COM_PRJID, COM_CONTEUDO) VALUES (?, ?, ?)';
    await query(sql, [idUsuario, idProjeto, conteudo]);

    res.status(201).json({ message: 'Comentário adicionado com sucesso!' });
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

router.get('/:idProjeto', async (req, res) => {
  const idProjeto = req.params.idProjeto;

  try {
    const sql = `
      SELECT
        COM_ID, COM_CONTEUDO, USR_NOME, USR_AVATAR, COM_USRID, COM_PRJID
      FROM TB_COMENTARIO
        INNER JOIN TB_USUARIO ON (COM_USRID = USR_ID)
      WHERE COM_PRJID = ?
      ORDER BY COM_ID DESC
    `;
    const comentarios = await query(sql, [idProjeto]);

    res.json({
      comentarios: comentarios.map(comentario => ({
        idComentario: comentario.COM_ID,
        conteudo: comentario.COM_CONTEUDO,
        nomeUsuario: comentario.USR_NOME,
        avatarUsuario: comentario.USR_AVATAR,
        idUsuario: comentario.COM_USRID,
        idProjeto: comentario.COM_PRJID
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const idComentario = req.params.id;
  const idUsuario = req.usuario.id; //obtido do middleware auth.js

  try {
    //verifica se o comentário pertence ao usuário autenticado
    const sqlCheck = 'SELECT COM_USRID FROM TB_COMENTARIO WHERE COM_ID = ?';
    const comentario = await query(sqlCheck, [idComentario]);

    if (comentario.length === 0) {
      return res.status(404).json({ message: 'Comentário não encontrado.' });
    }

    if (comentario[0].COM_USRID !== idUsuario) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir este comentário.' });
    }

    //deleta o comentário
    const sqlDelete = 'DELETE FROM TB_COMENTARIO WHERE COM_ID = ?';
    await query(sqlDelete, [idComentario]);

    res.status(200).json({ message: 'Comentário excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

router.get('/:idProjeto/contar', async (req, res) => {
  const idProjeto = req.params.idProjeto;

  try {
    const sql = `SELECT COUNT(*) AS totalComentarios FROM TB_COMENTARIO WHERE COM_PRJID = ?`;
    const [result] = await query(sql, [idProjeto]);

    res.json({ totalComentarios: result.totalComentarios });
  } catch (error) {
    console.error('Erro ao contar comentários:', error);
    res.status(500).json({ message: 'Erro no servidor ao contar comentários.' });
  }
});

export default router;