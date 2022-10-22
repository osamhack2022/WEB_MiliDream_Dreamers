import { Router } from "express";
import { upload } from "../../loaders/multer.js";

const router = Router();

// POST /image/upload
// Content-Type: multipart/form-data
// Requires field(name=img) with image data
router.post("/upload", upload.single("img"), (req, res) => {
	if (!req.file) return res.status(400).json("File Attachment is undefined");

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
});

export default router;
