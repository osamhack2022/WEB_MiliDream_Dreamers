import mariadb from "../loaders/mariadb.js";

export default class Objective {
	static async getAllobjective(userKey) {
		const sql = `SELECT o.objectiveKey, o.userKey, o.title, o.progress, o.explain
					 FROM Objective as o, User as u
					 WHERE o.userKey = u.userKey AND u.userKey=?;`;
		try {
			const result = await mariadb.query(sql, [userKey]);
			return result;
		} catch (err) {
			throw err;
		}
	}
	/**
	 * 요청받은 진행상태에 해동되는 목표 데이터만 긁어 모은다
	 * @param {number} progress 컨트롤러에서 받은 req.parmas 혹은 req.query로 부터 데이터를 가져온다
	 */
	static async getObjectiveByProgress(progress) {
		const sql = `SELECT o.objectiveKey, o.userKey, o.title, o.progress, o.explain
					 FROM Objective as o, User as u
					 WHERE o.userKey = u.userkey
					 AND o.progress=?;`;
		try {
			const result = await mariadb.query(sql, [progress]);
			return result;
		} catch (err) {
			throw err;
		}
	}
	/**
	 * id를 통해 목표데이터를 특정하여 세부정보를 확인
	 * @param {number} objectiveKey
	 */
	static async getObjectiveById(objectiveKey) {
		if (!objectiveKey)
			throw new Error(`objective가 존재해야 합니다.`);
		const sql = `SELECT o.objectiveKey, o.userKey, o.title, o.progress, o.explain
					 FROM Objective as o
					 LEFT JOIN User as u ON o.userKey = u.userKey
					 WHERE o.objectiveKey=?;`;
		try {
			const result = await mariadb.query(sql, [objectiveKey]);
			if (result.length === 0)
				throw new Error(
					`objectiveKey = "${objectiveKey}"에 해당하는 목표 데이터가 없습니다.`
				);
			return result;
		} catch (err) {
			throw err;
		}
	}
	static async createObjective(userKey, { title, progress, explain }) {

		const sql = `INSERT INTO Objective (title,prgoress,explain, userKey) 
					 VALUES(?,?,?,?);`;
		try {
			const result = await mariadb.query(sql, [
				title,
				progress,
				explain,
				userKey,
			]);
			if (result.affectedRows !== 1) {
				throw Error("목표를 추가하지 못했습니다!")
			}
			return;
		} catch (err) {
			throw err;
		}
	}

	static async updateObjectiveById(
		objectiveKey,
		{ progress, title, explain }
	) {
		let sql = `UPDATE Objective SET `;
		const updateList = []; // SET 뒤에 오는 값, 어떤 속성에 대해 수정을 할 것인지 결정
		const updateValue = []; // ?에 실제로 대입할 값, query메소드 두번째 인자의 배열[]에 들어감

		if (title !== undefined) {
			updateList.push(`title=?`);
			updateValue.push(title);
		}
		if (explain !== undefined) {
			updateList.push(`explain=?`);
			updateValue.push(explain);
		}
		if (progress !== undefined) {
			updateList.push(`prgoress=?`);
			updateValue.push(progress);
		}
		sql += updateList.join(","); // 배열의 values를 합치며 구분자는 콤마(,)
		sql += ` WHERE objectiveKey=?;`;

		if (!updateList.length) {
			throw new Error(
				`목표 정보를 받지 못했습니다. requires LEAST 1 parameter of [progress, title, explain]`
			);
		}

		try {
			const result = await mariadb.query(sql, [
				...updateValue,
				objectiveKey,
			]);
			if (result.affectedRows === 0) {
				throw new Error(
					`objectiveKey="${objectiveKey}"로 목표 정보를 업데이트 할 수 없습니다`
				);
			}
			return;
		} catch (err) {
			throw err;
		}
	}
	static async deleteObjectiveById(objectiveKey) {
		const sql = `DELETE FROM Objective WHERE ObjectiveKey = ?;`;

		try {
			const result = await mariadb.query(sql, [objectiveKey]);
			if (result.affectedRows === 0) {
				throw Error(
					`commentKey="${objectiveKey}"에 해당하는 목표가 없습니다`
				);
			}
			return;
		} catch (err) {
			throw err;
		}
	}
}
