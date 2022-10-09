import crypto from "crypto";
import accountConfig from "../config/account";
import Account from '../models/Account';

let tokenStore = new Map();
tokenStore.set("DEBUG", { expires: Infinity });
/**
 * 회원가입용 join_token을 생성합니다.
 *
 * @export
 * @param {string} agreements
 * @return {Promise<string>} join_token
 */
export async function generateSigninToken(agreements = "") {
	const expireAfter = 30 * 60 * 1000; // 30 minutes

	const token = await (new Promise((resolve, _) => {
		crypto.randomBytes(16, function (_, buffer) {
			resolve(buffer.toString('hex'));
		});
	}));

	tokenStore.set(token, {
		expires: Date.now() + expireAfter,
		agreements: agreements.split(",")
	});

	return { success: true, status: 200, join_token: token };
}

export async function signup({ token, username, userId, password, classType = "미정" }) {

	if (!checkToken(token))
		return { success: false, status: 403, error_code: -1, error: "Invalid join_token." };
	if (!(await checkUserId(userId)))
		return { success: false, status: 403, error_code: -2, error: "UserId Invalid or Duplicates." };
	if (!(await checkUsername(username)))
		return { success: false, status: 403, error_code: -3, error: "UserName Invalid or Duplicates." };
	if (!checkPassword(password))
		return { success: false, status: 403, error_code: -4, error: "Invalid password" };
	if (accountConfig.UserClass[classType] == undefined)
		return { success: false, status: 403, error_code: -5, error: "ClassType Invalid" };

	const success = await Account.create({ username, userId, password, classKey: accountConfig.UserClass[classType] });

	return { success: success, status: success ? "200" : "400" };
}

/**
 * 회원가입 가능한지 여부를 조회합니다.
 *
 * @export
 * @param {{token: string, username:string, userId:string}} { token, username, id, passwd }
 * @return {Promise<boolean>} 
 */
export async function attempt({ token, username, userId }) {
	if (!checkToken(token))
		return { success: false, status: 403, error_code: -1, error: "Invalid join_token." };
	if (userId && !(await checkUserId(userId)))
		return { success: false, status: 403, error_code: -2, error: "UserId Invalid or Duplicates." };
	if (username && !(await checkUsername(username)))
		return { success: false, status: 403, error_code: -3, error: "UserName Invalid or Duplicates." };
	return { success: true, status: 200 };
}

export async function remove({ userId }) {
	return Account.remove({ userId });
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
 * @param {string} userId 아이디
 * @return {Promise<boolean>} 
 */
async function checkUserId(userId) {
	if (!userId) return false;
	if (!accountConfig.userIdRegex.test(userId)) return false;

	const userIdConflict = await Account.hasUserId(userId);

	return !userIdConflict;
}

/**
 * 사용가능한 닉네임인지 확인합니다.
 *
 * @param {string} username 닉네임
 * @return {Promise<boolean>} 
 */
async function checkUsername(username) {
	if (!username) return false;
	if (!accountConfig.userNicknameRegex.test(username)) return false;

	const usernameConflicts = await Account.hasUsername(username);

	return !usernameConflicts;
}
async function checkPassword(password) {
	if (!password) return false;
	if (!accountConfig.userPwRegex.test(password)) return false;

	return true;
}
