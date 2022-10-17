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
}