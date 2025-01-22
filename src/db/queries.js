import { pool } from "./pool.js";
import bcrypt from 'bcryptjs';

async function getAllUsernames() {
    const query = 'SELECT * FROM users'
    const rows = await pool.query(query);
    return rows.rows;
}

// returns true if user was created
async function createUser(username, password) {
    const hashedPass = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const values = [username, hashedPass]
    const result = await pool.query(query, values);
    return result ? true : false;
}

// returns a user from db
async function getUser(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await pool.query(query, values);
    return result;
}

// returns user by id
async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result;
}


// create message
async function createMessage(username, entry) {
    const query = 'INSERT INTO messages (username, entry) VALUES ($1, $2)';
    const values = [username, entry];
    const result = await pool.query(query, values);
    return result ? true : false;
}

// return all messages by username
async function getMessages(username) {
    const query = 'SELECT * FROM messages WHERE username = $1';
    const values = [username];
    return await pool.query(query, values);
}

export {
    getAllUsernames,
    createUser,
    getUser,
    getUserById,
    getMessages,
    createMessage
};