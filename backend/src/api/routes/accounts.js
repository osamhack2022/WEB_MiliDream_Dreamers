import { Router } from "express";

const route = Router();

export default function (app /*Router*/) {
	app.use('/accounts', route);
	route.post('/signin', async (res, req) => {
		return req.status(501).json({ error: "Not Implemented😥" });
	});
	route.delete('/signout', async (res, req) => {
		return req.status(501).json({ error: "Not Implemented😥" });
	});
	route.post('/signup', async (res, req) => {
		return req.status(501).json({ error: "Not Implemented😥" });
	});
	route.get('/signup-token', async (res, req) => {
		return req.status(501).json({ error: "Not Implemented😥", join_token: "tokenHere" });
	});
}