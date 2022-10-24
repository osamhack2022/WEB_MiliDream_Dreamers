// @ts-check

import User from "../models/User.js";

export default class userService {
	/**
	 *
	 * @param {number} userKey
	 * @returns
	 */
	static getUserInfo(userKey) {
		return User.getUserInfo(userKey);
	}

	/**
	 *
	 * @param {number} userKey
	 * @param {{new_password: string}} userInfo
	 * @returns
	 */
	static putUserInfo(userKey, userInfo) {
		return User.putUserInfo(userKey, userInfo);
	}

	/**
	 *
	 * @param {number} userKey
	 * @param {{imageURL: string}} avaterInfo
	 * @returns
	 */
	static putUserAvatarInfo(userKey, avaterInfo) {
		return User.putUserAvatarInfo(userKey, avaterInfo);
	}
}
