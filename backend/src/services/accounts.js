// @ts-check

import crypto from "crypto";
import accountConfig from "../config/account.js";
import Account from "../models/Account.js";

/** @type {Map<string, {expires: number; agreements?: string[]}>} */
let tokenStore = new Map();
tokenStore.set("DEBUG", { expires: Infinity });

/**
 * 회원가입용 join_token을 생성합니다.
 *
 * @export
 * @param {string} agreements
 * @returns join_token
 */
export async function generateSigninToken(agreements = "") {
	const expireAfter = 30 * 60 * 1000; // 30 minutes

	/** @type {string} */
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

/**
 * `signupInfo`로 회원가입합니다.
 *
 * @export
 * @param {{userId: string; password: string; userName: string; userClass: number; token: string;}} signupInfo
 * @returns
 * @throws {Error}
 */
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
 * @param {{token: string, userName:string, userId:string}} signupInfo
 * @return
 */
export async function attempt({ token, userName, userId }) {
	if (!checkToken(token)) throw Error("Invalid join_token.");

	if (userId && !(await checkUserId(userId)))
		throw Error("UserId Invalid or Duplicates.");

	if (userName && !(await checkUsername(userName)))
		throw Error("UserName Invalid or Duplicates.");

	return;
}

/**
 *
 * @param {{userKey: number;}} userInfo
 * @returns
 */
export async function remove(userInfo) {
	return Account.remove(userInfo);
}

/**
 * join_token이 사용가능한지 확인합니다.
 *
 * @param {string} token join_token
 * @return
 */
function checkToken(token) {
	const info = tokenStore.get(token);
	if (!info) return false;
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
 * @return
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
 * @return
 */
async function checkUsername(username) {
	if (!username) return false;
	if (!accountConfig.userNicknameRegex.test(username)) return false;

	const usernameConflicts = await Account.hasUsername(username);

	return !usernameConflicts;
}

/**
 * 비밀번호가 사용가능한지 확인합니다.
 *
 * @param {string} password
 * @returns
 */
async function checkPassword(password) {
	if (!password) return false;
	return accountConfig.userPwRegex.test(password);
}
