import * as mariadb from "../loaders/mariadb";

export default async function () {
	const conn = await mariadb.getConnection();
	const result = await conn.query(`SELECT VERSION();`);
	//Logger.info(`DB Version: ${Object.values(result['0'])[0]}`);
	conn.release();
	return Object.values(result['0'])[0];  // should return string
}