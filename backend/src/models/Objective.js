import mariadb from "../loaders/mariadb"

export default class Objective {
	constructor(newObjective) {
		this.purposeKey = newObjective.purposeKey;
		this.userKey = newObjective.userKey;
		this.title = newObjective.title;
		this.progress = newObjective.progress;
		this.explain = newObjective.explain;
	}
	static async getAllobjective() {
		const conn = await mariadb.conn();
		const sql = `SELECT o.objectiveKey, o.userKey, o.title, o.progress, o.explain
					 FROM Objective as o , User as u
					 WHERE o.userKey = u.userKey;`;
		try { const result = await conn.query(sql); }
		catch(err){ throw err}
		finally{ conn.release()};
		return result;
	}
	/**
	 * 요청받은 진행상태에 해동되는 목표 데이터만 긁어 모은다
	 * @param {number} progress 컨트롤러에서 받은 req.parmas 혹은 req.query로 부터 데이터를 가져온다
	 */
	static async getObjectiveByProgress(progress){
		const conn = await mariadb.conn();
		const sql = `SELECT o.objectiveKey, o.userKey, o.title, o.progress, o.explain
					 FROM Objective as o, User as u
					 WHERE o.userKey = u.userkey
					 AND o.progress=?;`
		try{const result = await conn.query(sql,[progress])}
		catch(err) {throw err}
		finally{ conn.release() };
		return result;
	}
	/**
	 * id를 통해 목표데이터를 특정하여 세부정보를 확인
	 * @param {number} objectiveKey
	 */
	 static async getObjectiveById(objectiveKey){
		if(objectiveKey == undefined) throw new Error(`objective가 존재해야 합니다.`);
		const conn = await mariadb.conn();
		const sql = `SELECT o.objectiveKey, o.userKey, o.title, o.progress, o.explain
					 FROM Objective as o
					 LEFT JOIN User as u ON o.userKey = u.userKey
					 WHERE o.objectiveKey=?;`
		try{
			const result = await conn.query(sql,[objectiveKey])
			if (result.length === 0 ) throw new Error(`objectiveKey = "${objectiveKey}"에 해당하는 목표 데이터가 없습니다.`)
			return result;
		}
		catch(err) {throw err}
		finally{ conn.release() };
	}
	
}