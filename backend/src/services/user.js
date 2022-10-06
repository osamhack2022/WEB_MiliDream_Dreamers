import mariadb from "../loaders/mariadb";
import User from "../models/user";

export function getUserInfo(userId) {
	return User.getUserInfo(userId);
}
