import mariadb from "../loaders/mariadb";
import crypto from "crypto";
import accountConfig from "../config/account";

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
		return { success: false, status: 403, error: "UserId Invalid or Duplicates." };
	if (!(await checkUsername(username)))
		return { success: false, status: 403, error: "UserName Invalid or Duplicates." };

	return { success: true, status: 200 };
}

/**
 * join_token이 사용가능한지 확인합니다.
 *
 * @param {string} token join_token
 * @return {boolean} 
 */
function checkToken(token) {
	const info = tokenStore.get(token);
	if (info === undefined) return false;
	if (info.expires < Date.now()) { // token expired
		tokenStore.delete(token);
		return false;
	}
	return true;
}

/**
 * 사용가능한 아이디인지 확인합니다.
 *
 * @param {string} id 아이디
 * @return {boolean} 
 */
async function checkId(id) {
	if (!id) return false;
	if (!accountConfig.userIdRegex.test(id)) return false;

	const sql = 'SELECT 1 FROM `User` WHERE `id` = ?;';
	const conn = await mariadb.getConnection();
	const result = await conn.query(sql, [id]);
	conn.release();

	return result.length == 0;
}

/**
 * 사용가능한 닉네임인지 확인합니다.
 *
 * @param {string} username 닉네임
 * @return {boolean} 
 */
async function checkUsername(username) {
	if (!username) return false;
	if (!accountConfig.userNicknameRegex.test(username)) return false;

	const sql = 'SELECT 1 FROM `User` WHERE `userName` = ?;';
	const conn = await mariadb.getConnection();
	const result = await conn.query(sql, [username]);
	conn.release();

	return result.length == 0;
}