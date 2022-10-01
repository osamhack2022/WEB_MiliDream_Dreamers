import mariadb from "../loaders/mariadb";

export default async function () {
	const pool = await mariadb();
	const conn = await pool.getConnection();
	const result = await conn.query(`SELECT VERSION();`);
	//Logger.info(`DB Version: ${Object.values(result['0'])[0]}`);
	conn.release();
	return Object.values(result['0'])[0];  // should return string
}