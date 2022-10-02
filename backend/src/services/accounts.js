import mariadb from "../loaders/mariadb";

// let tokenStore = new Map();
/**
 *회원가입시 사용되는 토큰을 생성합니다
 *
 * @export
 */
export function generateSigninToken() {
	const error = false; // || "회원가입 토큰을 생성할 수 없습니다.";

	// 토큰 생성 로직

	if (error) return { success: false, status: 500, error };
	return { success: true, status: 200, join_token: "TestToken" };
}

export function signup({ token, username, id, passwd }) {
	const error = false; //||""
	if (error) return { success: false, status: 500, error };
}

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