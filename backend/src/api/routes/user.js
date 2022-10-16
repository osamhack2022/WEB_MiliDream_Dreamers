import { Router } from "express";
import UserService from "../../services/user.js";
import { checkUserId } from "../middlewares/index.js";

const router = Router();

router.all("/", (req, res)=>{
	if (!req?.user.userKey) return res.status(401).send();
	return res.redirect(`./${req.user.userKey}`);
});

router
	.route("/:userId")
	.all(checkUserId)
	.get(async (req, res) => {
		const result = await UserService.getUserInfo(req.params.userId);
		res.json(result);
		// res.send(`Send back user info, userId is ${req.params.userId}`);
	})
	/**
	 * @todo 유저의 Avtar image URL 받아와서 작업 (req.file)
	 */
	.put(async (req, res) => {
		const new_password = req.body.new_password;
		if (!new_password) {
			new Error("new_password is not valid");
		}
		const result = await UserService.putUserInfo(req.params.userId, {
			new_password,
		});
		res.send(
			`Fix user info, userId is ${req.params.userId}, successed: ${result}`
		);
	});

export default router;
