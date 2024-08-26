import { createConnection } from 'mysql2';

const db = createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'parolanto'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

const query = (sql, params, callback) => {
    db.query(sql, params, callback);
};

export { query };