import { createPool } from 'mysql2/promise'; //createpool para suportar promessas

const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'parolanto'
});

const query = async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
};

export { query };