import User from "../models/user.js";

export default class UserService {
	constructor() {
		// initialize something
	}

	/**
	 *
	 * @param {number | string} userId
	 * @returns {Promise<User?>}
	 */
	static getUserInfo(userId) {
		return User.getUserInfo(userId);
	}

	/**
	 *
	 * @param {number | string} userId
	 * @param {{new_password: string}} newInfo
	 * @returns
	 */
	static putUserInfo(userId, newInfo) {
		return User.putUserInfo(userId, newInfo);
	}

	static putUserAvatarInfo(userId, newInfo){
		return User.putUserAvatarInfo(userId, newInfo);
	}
}
