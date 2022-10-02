import { Router } from "express";
import mariadbTest from "../../services/mariadbTest";

const route = Router();

route.get("/db-test", async (req, res) => {
	return res.send(await mariadbTest());
});

export default route;
