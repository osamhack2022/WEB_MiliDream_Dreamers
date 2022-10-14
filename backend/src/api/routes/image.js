import { Router } from "express";
import { upload } from "../../loaders/multer";

const router = Router();

// POST /image/upload-avatar
// Content-Type: multipart/form-data
// Requires field(name=avatar) with image data
router.post("/upload-avatar", upload.single('avatar'), (req, res) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;

    res.json({ path: `/public/${filename}` });
});

// POST /image/upload
// Content-Type: multipart/form-data
// Requires field(name=postImages) with image data
router.post("/upload", upload.single('postImages'), (req, res) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;

    res.json({ path: `/public/${filename}` });
});

export default router;
