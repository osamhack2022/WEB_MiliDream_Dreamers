import { Router } from "express";
import * as user from "../../services/user";

const router = Router();

router
	.route("/:userId")
	.get((req, res) => {
		res.send(`Send back user info, userId is ${req.params.userId}`);
	})
	.put((req, res) => {
		res.send(`Fix user info, userId is ${req.params.userId}`);
	});

export default router;
