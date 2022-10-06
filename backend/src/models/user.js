import mariadb from "../loaders/mariadb";

const User = function (user) {
	this.user = user;
};

/**
 * @typedef User
 * @property {string} userName name of the User
 * @property {string} id used to log in
 * @property {string} classType User가 어떤 클래스에 속하는지
 */

/**
 *
 * @param {number} userId key of the User
 * @returns {User?} password를 제외한 User의 정보를 담음
 */
User.getUserInfo = async function (userId) {
	const sql =
		"SELECT userName, id, classType FROM User, Class WHERE userKey=? AND User.classKey=Class.classKey;";
	const result = await mariadb.query(sql, [userId]);
	if (!result) return null;
	console.log(result[0]);
	const { userName, id, classType } = result[0];

	return { userName, id, classType };
};

export default User;
