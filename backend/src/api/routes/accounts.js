import { Router } from "express";
import * as accounts from "../../services/accounts";

const route = Router();

route
	.route("/account")
	.post(
		/**
		 * 회원가입
		 */
		async (req, res) => {
			const { token, username, id, passwd, classType } = req.body;
			const result = accounts.signup({ token, username, id, passwd, classType });
			return res.status(501).json({ error: "Not Implemented😥" });
		}
	)
	.delete(
		/**
		 * 회원탈퇴
		 */
		async (req, res) => {
			return res.status(501).json({ error: "Not Implemented😥" });
		}
	);

route.get("/signup-token", async (req, res) => {
	const result = accounts.generateSigninToken();
	return res.status(result.status).json(result);
	//return res.status(501).json({ error: "Not Implemented😥", join_token: "tokenHere" });
});

route
	.route("sign")
	.post(async (req, res) => {
		return res.status(501).json({ error: "Not Implemented😥" });
	})
	.delete(async (req, res) => {
		return res.status(501).json({ error: "Not Implemented😥" });
	});

route.post("/attempt", async (req, res) => {
	const { token, nickname: username, id, passwd } = req.body;
	const result = await accounts.attempt({ token, username, id, passwd });
	return res.status(result.status).json(result);
});

export default route;
