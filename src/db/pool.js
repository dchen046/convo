import pg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
});

console.log(process.env.USER);