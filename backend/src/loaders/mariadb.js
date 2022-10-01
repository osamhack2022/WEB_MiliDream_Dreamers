import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectionLimit: 5,
});

export async function getConnection(callback) {
	return pool.getConnection(callback);
}

export async function end() { return pool.end(); }