import Objective from "../models/Objective.js";

export default class ObjectiveService {
	static getAllObjective(userKey) {
		return Objective.getAllobjective(userKey);
	}

	static createObjective(userKey, objectiveObj) {
		return Objective.createObjective(userKey, objectiveObj);
	}

	static getObjectiveById(objectiveKey) {
		return Objective.getObjectiveById(objectiveKey);
	}

	static updateObjectiveById(objectiveKey, objectiveObj) {
		return Objective.updateObjectiveById(objectiveKey, objectiveObj);
	}

	static deleteObjectiveById(objectiveKey) {
		return Objective.deleteObjectiveById(objectiveKey);
	}
}

