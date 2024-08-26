import express, { json } from 'express';
import cors from 'cors';
import usersRouter from './routes/usuarios.js';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(json());

app.use('/usuarios', usersRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});