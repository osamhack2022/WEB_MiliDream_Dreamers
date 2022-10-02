import { Router } from "express";
import * as accounts from "../../services/accounts";

const route = Router();


route.post("/signin", async (req, res) => {
	return res.status(501).json({ error: "Not Implemented😥" });
});
route.delete("/signout", async (req, res) => {
	return res.status(501).json({ error: "Not Implemented😥" });
});
route.post("/signup", async (req, res) => {
	const { token, username, userId, password } = req.body;
	const result = await accounts.signup({ token, username, userId, password });
	return res.status(result.status).json({ ...result, status: undefined });
});
route.get("/signup-token", async (req, res) => {
	const agreements = req.query?.agreements;
	if (!agreements) return res.status(400).json({ error: "agreements list (string[]) required." });

	const result = await accounts.generateSigninToken(agreements);
	return res.status(result.status).json({ ...result, status: undefined });
});
route.post("/attempt", async (req, res) => {
	const { token, username, userId } = req.body;
	const result = await accounts.attempt({ token, username, userId });
	return res.status(result.status).json({ ...result, status: undefined });
});

export default route;