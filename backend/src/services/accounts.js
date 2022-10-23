import crypto from "crypto";
import accountConfig from "../config/account.js";
import Account from "../models/Account.js";

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

	const token = await new Promise((resolve, _) => {
		crypto.randomBytes(16, function (_, buffer) {
			resolve(buffer.toString("hex"));
		});
	});

	tokenStore.set(token, {
		expires: Date.now() + expireAfter,
		agreements: agreements.split(","),
	});

	return token;
}

export async function signup({ userId, password, userName, userClass, token }) {
	if (!checkToken(token)) throw Error("Invalid join_token.");
	if (!(await checkUserId(userId)))
		throw Error("UserId Invalid or Duplicates.");
	if (!(await checkUsername(userName)))
		throw Error("UserName Invalid or Duplicates.");
	if (!checkPassword(password)) throw Error("Invalid password");
	if (accountConfig.UserClass[userClass] == undefined)
		throw Error("ClassType Invalid");

	return Account.create({
		userName,
		userId,
		password,
		userClass,
	});
}

/**
 * 회원가입 가능한지 여부를 조회합니다.
 *
 * @export
 * @param {{token: string, username:string, userId:string}} { token, username, id, passwd }
 * @return {Promise<void>}
 */
export async function attempt({ token, username, userId }) {
	if (!checkToken(token)) throw Error("Invalid join_token.");

	if (userId && !(await checkUserId(userId)))
		throw Error("UserId Invalid or Duplicates.");

	if (username && !(await checkUsername(username)))
		throw Error("UserName Invalid or Duplicates.");

	return;
}

export async function remove(userInfo) {
	return Account.remove(userInfo);
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
	if (info.expires < Date.now()) {
		// token expired
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
	return accountConfig.userPwRegex.test(password);
}
