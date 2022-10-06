import mariadb from "../loaders/mariadb";
import Logger from "../loaders/logger";

/** Post 생성자 */
const Post = function (post) {
	this.userkey = post.userkey;
	this.postTime = post.postTime;
	this.title = post.title;
	this.body = post.body;
	this.categoryKey = post.categoryKey;
	this.carrerPostKey = post.carrerPostKey;
};

// Post.create = async function (newPost) {
// 	const conn = await mariadb.getConnection();
// 	const sql = `INSERT INTO Post SET ?`;
// 	const result = await conn.query(sql);

// 	Logger.info(`Create Post: ${ {...newPost} }`)
// 	return {...newPost};
// }
Post.getAll = async function (categoryKey) {
	const sql = `SELECT * FROM Post WHERE categoryKey = ${categoryKey} ;`;
	const result = await mariadb.query(sql);

	return result;
};

export default Post;
