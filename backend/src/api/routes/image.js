import { Router } from "express";
import { upload } from "../../loaders/multer";

const router = Router();

// POST /image/upload
// Content-Type: multipart/form-data
// Requires field(name=img) with image data
router.post("/upload", upload.single('img'), (req, res) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;

    res.json({ path: `/public/images/${filename}` });
});

export default router;
