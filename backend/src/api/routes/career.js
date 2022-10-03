import { Router } from "express";
import surveyRouter from "./carrerSurvey"
import Post from '../../models/Post'

const router = Router();

router.get("/contest", async (req, res) => {
	const categoryKey = 1; //category fix되면 env로 변경
	
	console.log(`${Post.getAll(categoryKey)}`);
	res.send(`공모전 게시글:${await Post.getAll(categoryKey)}`)
});

router.get("/contest/:articleId", (req, res) => {
	res.send('Contest detail contents')
})

router.use("/survey", surveyRouter);

export default router;
