import { Router } from 'express';
const router = Router();
import { query } from '../config/db.config.js';
import auth from '../middleware/auth.js';

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

router.post('/', auth, async (req, res) => {
  const usuario = req.usuario.id;
  const { PRJ_NOME: nome, PRJ_DESCRICAO: descr, PRJ_FONOTATICA: phono } = req.body.projeto;
  try{

      const sql = 'INSERT INTO TB_PROJETO (PRJ_USRID, PRJ_NOME, PRJ_DESCRICAO, PRJ_FONOTATICA) VALUES (?, ?, ?, ?)';
      const values = [usuario, nome, descr, phono];
      await query(sql, values);
      return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  }
  catch (error) {
      console.error('Erro ao inserir vocábulo:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao cadastrar projeto.' });
  }
});

router.get('/usersconlangs', auth, async (req, res) => {
  try {
    const usuario = req.usuario.id;
    const sql = 'SELECT p.* FROM TB_PROJETO p where p.prj_usrid  = ?';
    // Usa a função query que você exportou
    const rows = await query(sql, [usuario]);

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

router.put('/:id', async (req, res) => {
  const projectId = req.params.id;
  const { PRJ_NOME: name, PRJ_DESCRICAO: descr, PRJ_FONOTATICA: phono } = req.body;

  try {
      const sql = `
          UPDATE TB_PROJETO
          SET PRJ_NOME = ?, PRJ_DESCRICAO = ?, PRJ_FONOTATICA = ?
          WHERE PRJ_ID = ?;
      `;
      const values = [name, descr, phono, projectId];

      const result = await query(sql, values);

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Projeto não encontrado.' });
      }

      res.status(200).json({ message: 'Projeto editado com sucesso.' });
  } catch (error) {
      console.error('Error na edição do projeto:', error);
      res.status(500).json({ error: 'Um erro ocorreu na edição.' });
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

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM TB_PROJETO WHERE PRJ_ID = ?';

  try {
      const results = await query(sql, [id]);

      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Projeto não encontrado.' });
      }
      
      res.status(204).send(); 
  } catch (error) {
      console.error('Erro ao remover projeto:', error);
      res.status(500).json({ error: 'Um erro ocorreu durante a remoção.' });
  }
});

export default router;