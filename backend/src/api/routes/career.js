import { Router } from "express";
import surveyRouter from "./carrerSurvey"

const router = Router();

router.get("/contest", (req, res) => {
	res.send('List of contests can participate in')
})
router.get("/contest/:articleId", (req, res) => {
	res.send('Contest detail contents')
})

router.use("/survey", surveyRouter);

export default router;
