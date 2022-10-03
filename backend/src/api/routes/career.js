import { Router } from "express";
import surveyRouter from "./carrerSurvey"

const router = Router();

router.get("/contest", (req, res) => {
	const categoryKey = 1; //category fix되면 env로 변경
	Post.getAll(categoryKey, (err, data) => {
		if (err) {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Posts"
			})
		}
		res.send(data);
	})
})
router.get("/contest/:articleId", (req, res) => {
	res.send('Contest detail contents')
})

router.use("/survey", surveyRouter);

export default router;
