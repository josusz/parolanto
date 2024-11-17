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

//GET para pesquisar projetos por nome (Campo "Pesquisar" do navbar-interativo)
router.get('/pesquisar', async (req, res) => {
  const termo = `%${req.query.termo}%`;
  try {
    const projetos = await query(
      'SELECT PRJ_ID, PRJ_NOME, PRJ_DESCRICAO FROM TB_PROJETO WHERE PRJ_NOME LIKE ?',
      [termo]
    );
    
    if (projetos.length === 0) {
      return res.status(404).json({ message: 'Projeto não encontrado.' });
    }

    res.json({
      projetos: projetos.map(projeto => ({
        idProjeto: projeto.PRJ_ID,
        nomeProjeto: projeto.PRJ_NOME,
        descricaoProjeto: projeto.PRJ_DESCRICAO,
        idUsuarioProjeto: projeto.PRJ_USRID
      }))
    });
  } catch (error) {
    console.error('Erro ao realizar pesquisa de projetos:', error);
    res.status(500).json({ message: 'Erro no servidor ao realizar a pesquisa de projetos.' });
  }
});

router.get('/feed', async (req, res) => {
  const ordem = req.query.ordem || 'aleatorio'; //valor padrão é "aleatorio"
  try {
    let sql;

    if (ordem === 'aleatorio') {
      sql = 'SELECT PRJ_ID, PRJ_NOME, PRJ_DESCRICAO, PRJ_USRID FROM TB_PROJETO ORDER BY RAND()';
    } else if (ordem === 'alfabetico') {
      sql = 'SELECT PRJ_ID, PRJ_NOME, PRJ_DESCRICAO, PRJ_USRID FROM TB_PROJETO ORDER BY PRJ_NOME ASC';
    } else {
      return res.status(400).json({ message: 'Tipo de ordenação inválido.' });
    }

    const rows = await query(sql);

    res.json({
      projetos: rows.map(projeto => ({
        idProjeto: projeto.PRJ_ID,
        nomeProjeto: projeto.PRJ_NOME,
        descricaoProjeto: projeto.PRJ_DESCRICAO,
        idUsuarioProjeto: projeto.PRJ_USRID
      }))
    });
  } catch (error) {
    console.error('Erro ao carregar projetos no feed:', error);
    res.status(500).json({ message: 'Erro no servidor ao carregar os projetos no feed.' });
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