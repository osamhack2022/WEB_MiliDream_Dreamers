import { Router } from "express";
import { generateSigninToken, signup } from "../../services/accounts";

const route = Router();

route.post("/signin", async (req, res) => {
	return res.status(501).json({ error: "Not Implemented😥" });
});

route.delete("/signout", async (req, res) => {
	return res.status(501).json({ error: "Not Implemented😥" });
});

route.post("/signup", async (req, res) => {
	const { token, nickname: username, id, passwd } = req.body;
	const result = signup({ token, username, id, passwd });
	return res.status(501).json({ error: "Not Implemented😥" });
});

route.get("/signup-token", async (req, res) => {
	const result = generateSigninToken();
	return res.status(result.status).json(result);
	//return res.status(501).json({ error: "Not Implemented😥", join_token: "tokenHere" });
});

export default route;
