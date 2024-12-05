import express, { json } from 'express';
import cors from 'cors';
import usersRouter from './routes/usuarios.js';
import conlangsRouter from './routes/conlangs.js';
import vocabRouter from './routes/vocab.js';
import defRouter from './routes/definicoes.js';
import comentariosRouter from './routes/comentarios.js'
import regrasRouter from './routes/regras.js';
import exemplosRouter from './routes/exemplos.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(json());

app.use('/usuarios', usersRouter);
app.use('/conlangs', conlangsRouter);
app.use('/vocab', vocabRouter);
app.use('/definicoes', defRouter);
app.use('/comentarios', comentariosRouter);
app.use('/regras', regrasRouter);
app.use('/exemplos', exemplosRouter);

app.get('/api', (req, res) => {
    res.status(200).json({
        message:'API em execução!',
        version: '1.0.0'
    })
})

app.use(function (req, res) {
    res.status(404).json({
        errors: [{
            value: `${req.originalUrl}`,
            msg: `A rota ${req.originalUrl} não existe nesta API!`,
            param: 'invalid route'
        }]
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});