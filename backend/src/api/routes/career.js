import { Router } from "express";
import surveyRouter from "./carrerSurvey";
import Post from '../../models/Post';
import CareerService from "../../services/career";

const router = Router();
let CareerServiceInstance = new CareerService();

router.get("/contest", async (req, res) => {
	res.send(`공모전 게시글 목록:${await CareerServiceInstance.findAll()}`)
});

router.get("/contest/:articleId", (req, res) => {
	res.send('Contest detail contents')
})

router.use("/survey", surveyRouter);

export default router;
