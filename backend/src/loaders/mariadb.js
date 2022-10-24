// @ts-check

import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	connectionLimit: 5,
});

export default {
	getConnection: function () {
		return pool.getConnection();
	},
	end: function () {
		return pool.end();
	},
	/**
	 *
	 * @param {string | mariadb.QueryOptions} sql
	 * @param {any} [values]
	 * @returns
	 */
	query: function (sql, values) {
		return pool.query(sql, values);
	},
};
