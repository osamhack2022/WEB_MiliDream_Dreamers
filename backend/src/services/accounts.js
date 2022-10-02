import mariadb from "../loaders/mariadb";
import crypto from "crypto";

let tokenStore = new Map();
/**
 * 회원가입용 join_token을 생성합니다.
 *
 * @export
 * @param {string[]} agreements
 * @return {Promise<string>} join_token
 */
export async function generateSigninToken(agreements) {
	const expireAfter = 30 * 60 * 1000; // 30 minutes

	const token = await (new Promise((resolve, _) => {
		crypto.randomBytes(16, function (_, buffer) {
			resolve(buffer.toString('hex'));
		});
	}));

	tokenStore.set(token, {
		expires: Date.now() + expireAfter,
		agreements
	});

	return { success: true, status: 200, join_token: token };
}

export function signup({ token, username, id, passwd }) {
	const error = false; //||""
	if (error) return { success: false, status: 500, error };
}

/**
 * 회원가입 가능한지 여부를 조회합니다.
 *
 * @export
 * @param {{token: string, username:string, id:string, passwd:string}} { token, username, id, passwd }
 * @return {Promise<boolean>} 
 */
export async function attempt({ token, username, id, passwd }) {
	if (!checkToken(token))
		return { success: false, status: 403, error: "Invalid join_token." };
	if (!(await checkId(id)))
		return { success: false, status: 403, error: "UserId Duplicates." };
	if (!(await checkUsername(username)))
		return { success: false, status: 403, error: "UserName Duplicates." };

	return { success: true, status: 200 };
}

function checkToken(token) {
	return true;
}

async function checkId(id) {
	if (!id) return false;
	// TODO: #11 Insert regex guard clause

	const sql = 'SELECT 1 FROM `User` WHERE `id` = ?;';
	const conn = await mariadb.getConnection();
	const result = await conn.query(sql, [id]);
	conn.release();

	return result.length == 0;
}

async function checkUsername(username) {
	if (!username) return false;
	// TODO: #11 Insert regex guard clause

	const sql = 'SELECT 1 FROM `User` WHERE `userName` = ?;';
	const conn = await mariadb.getConnection();
	const result = await conn.query(sql, [username]);
	conn.release();

	return result.length == 0;
}