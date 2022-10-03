import mariadb from "../loaders/mariadb";
import Logger from '../loaders/logger';

/** Post 생성자 */
const Post = function (post) {
	this.userkey = post.userkey;
	this.postTime = post.postTime;
	this.title = post.title;
	this.body = post.body;
	this.categoryKey = post.categoryKey;
	this.carrerPostKey = post.carrerPostKey;
}
Post.getAll = async function (categoryKey,result) {
	const conn = await mariadb.getConnection();
	const sql = 'SELECT * FROM `Post` WHERE `categoryKey` = ?;';
	conn.query(sql, [categoryKey], (err, res) => {
		if (err) {
			Logger.info(`error: ${err}`);
			result(err, null);
			return;
		}
		Logger.info(`Posts: `, res);
		result(null, res);
	})
	conn.release();
};