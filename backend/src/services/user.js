import User from "../models/user";

export async function getUserInfo(userId) {
	return await User.getUserInfo(userId);
}

export function putUserInfo(userId, newInfo) {
	return User.putUserInfo(userId, newInfo);
}
