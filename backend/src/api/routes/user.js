import { Router } from "express";
import UserService from "../../services/user.js";
import { checkUserId } from "../middlewares/index.js";

const router = Router();
router
	.route("/:userId")
	.all(checkUserId)
	.get(async (req, res) => {
		const result = await UserService.getUserInfo(req.params.userId);
		res.json(result);
		// res.send(`Send back user info, userId is ${req.params.userId}`);
	})
	.put(async (req, res) => {
		const new_password = req.body.new_password;
		if (!new_password) {
			next(new Error("new_password is not valid"));
		}
		const result = await UserService.putUserInfo(req.params.userId, {
			new_password,
		});
		res.send(
			`Fix user info, userId is ${req.params.userId}, successed: ${result}`
		);
	});

export default router;
