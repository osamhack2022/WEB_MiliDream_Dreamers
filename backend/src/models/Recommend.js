import mariadb from "../loaders/mariadb";

export default class Recommend {
	static async getRecommendbyBoardId(postKey, { userKey }) {
		const sql = `SELECT userKey FROM Recommenders WHERE postKey=?;`;
		const result = await mariadb.query(sql, [postKey]);

		if (!userKey) {
			return { recommenderList: result };
		}

		const flag = result.some((ele) => ele.userKey === Number(userKey));
		return { didRecommend: flag };
	}

	static async postRecommendbyBoardId(postKey, { userKey }) {
		const sql = `INSERT INTO Recommenders(postKey, userKey) VALUES (?, ?);`;
		if (!userKey) {
			throw Error("userKey가 주어지지 않았습니다");
		}
		const conn = await mariadb.getConnection();
		try {
			if (await recommendExist(postKey, userKey, conn)) {
				throw Error(`userKey="${userKey}"는 이미 추천했습니다`);
			}
			const result = await conn.query(sql, [postKey, userKey]);
			if (result.affectedRows === 0) throw Error("추천하지 못했습니다");
			return;
		} catch (err) {
			throw err;
		} finally {
			await conn.release();
		}
	}

	static async deleteRecommendbyBoardId(postKey, { userKey }) {
		if (userKey === undefined) {
			throw Error("userKey가 주어지지 않았습니다");
		}
		const sql = `DELETE FROM Recommenders WHERE postKey=? AND userKey=?`;
		const result = await mariadb.query(sql, [postKey, userKey]);
		if (result.affectedRows === 0) {
			throw Error(
				`userKey="${userKey}"는 postKey="${postKey}"에 추천하지 않았습니다`
			);
		}

		return;
	}
}

async function recommendExist(postKey, userKey, conn) {
	const sql = `SELECT 1 FROM Recommenders WHERE postKey=? AND userKey=?;`;
	const result = await conn.query(sql, [postKey, userKey]);

	return result.length > 0;
}
