import { Router } from "express";
import UserService from "../../services/user.js";
import { checkUserId } from "../middlewares/index.js";
import url from "url";

const router = Router();

router.all("/", (req, res) => {
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
	 * @todo 유저의 Avtar image URL 받아와서 작업 (req.body.imageURL)
	 * @todo 유저 인증 적용(본인만 수정 가능하게)
	 */
	.put(async (req, res) => {
		const { new_password, imageURL } = req.body;
		if (new_password) {
			const result = await UserService.putUserInfo(req.params.userId, {
				new_password,
			});
			res.send(
				`Fix user info, userId is ${req.params.userId}, successed: ${result}`
			);
		} else if (imageURL) {
			const parsedURL = url.parse(imageURL);
			console.log(parsedURL.pathname); // 도메인 달라질 수 있으므로 디비에는 경로만 저장
			const result =  await UserService.putUserAvatarInfo(req.params.userId, {
				imageURL: parsedURL
			});
			res.status(result?200:400).send(
				`Fix user avatar info, userId is ${req.params.userId}, successed: ${result}`
			);
		} else {
			return res.status(400).json({ err: "Request Requires either new_password NOR imageURL" });
		}
	});

export default router;
