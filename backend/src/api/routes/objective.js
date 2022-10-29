import { Router } from "express";
import { checkUserExist } from "../middlewares/index.js";
import ObjectiveService from "../../services/objective.js";

const router = Router();

router.route("/").all(checkUserExist).get(async (req, res) => {
	try {
		const result = await ObjectiveService.getAllObjective(req.user.userKey);
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}).post(async (req, res) => {
	try {
		const result = await ObjectiveService.createObjective(req.body);
		res.status(200).json();
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
})
router.route("/:objectiveId").get(async (req, res) => {
	try {
		const result = await ObjectiveService.getObjectiveById(req.params.objectiveId);
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}).all(checkUserExist).put(async (req, res) => {
	try {
		const result = await ObjectiveService.updateObjectiveById(req.params.objectiveId, req.body);
		res.status(200).json();
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}).delete(async (req, res) => {
	try {
		const result = await ObjectiveService.deleteObjectiveById(req.params.objectiveId);
		res.status(200).json();
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
})