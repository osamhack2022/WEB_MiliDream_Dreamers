// @ts-check

import { Router } from "express";
import { upload } from "../../loaders/multer.js";

const router = Router();

/**
 * API: /image/upload
 * Content-Type: multipart/form-data
 * Requires field(name=img) with image data
 */
router.post(
	"/upload",
	upload.single("img"),

	/**
	 * file을 받아 저장합니다.
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 * @returns
	 */
	(req, res) => {
		if (!req.file)
			return res
				.status(400)
				.json({ err: "File Attachment is undefined" });

		const {
			fieldname,
			originalname,
			encoding,
			mimetype,
			destination,
			filename,
			path,
			size,
		} = req.file;

		res.json({ path: `/images/${filename}` });
	}
);

export default router;
