// @ts-check

import { Router } from "express";
import UserService from "../../services/user.js";
import { checkUserExist, checkUserId } from "../middlewares/index.js";
import url from "url";

const router = Router();

router.all(
	"/",
	checkUserExist,
	/**
	 * API: ALL /user
	 *
	 * 로그인되어 있어야 합니다.
	 * req.user에 있는 사용자의 정보를 반환합니다. /user/:userKey로 리다이렉트합니다.
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * @returns
	 */
	(req, res) => {
		// @ts-ignore
		return res.redirect(`./user/${req.user?.userKey}`);
	}
);

router
	.route("/:userId")
	.all(checkUserId)
	.get(
		/**
		 * API: GET /user/:userId
		 *
		 * userKey를 바탕으로 사용자 정보를 반환합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			try {
				// @ts-ignore
				const result = await UserService.getUserInfo(req.params.userId);
				res.status(200).json(result);
			} catch (err) {
				return res.status(400).json({ err: err.message });
			}
		}
	)
	/**
	 * @todo 유저의 Avtar image URL 받아와서 작업 (req.body.imageURL)
	 * @todo 유저 인증 적용(본인만 수정 가능하게)
	 */
	.put(
		/**
		 * API: PUT /user/:userId
		 *
		 * 입력한 정보를 바탕으로 유저의 정보를 수정합니다.
		 *
		 * @param {import("express").Request} req
		 * @param {import("express").Response} res
		 */
		async (req, res) => {
			/** @type {{new_password?: string, imageURL?: string, enlistment?: string, belong?: string, servant?: string, introduce?: string}} */
			const {
				new_password,
				imageURL,
				enlistment,
				belong,
				servant,
				introduce,
			} = req.body;

			try {
				if (
					new_password ||
					enlistment ||
					belong ||
					servant ||
					introduce
				) {
					// @ts-ignore
					await UserService.putUserInfo(req.params.userId, {
						new_password,
						enlistment,
						belong,
						servant,
						introduce,
					});
				}
				if (imageURL) {
					const parsedURL = url.parse(imageURL);
					// 도메인 달라질 수 있으므로 DB에는 경로만 저장
					if (parsedURL.pathname) {
						// @ts-ignore
						await UserService.putUserAvatarInfo(req.params.userId, {
							imageURL: parsedURL.pathname,
						});
					}
				}

				return res.status(200).end();
			} catch (err) {
				return res.status(400).json({ err: err.message });
			}
		}
	);

export default router;
