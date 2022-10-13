import { Router } from "express";
import { uploadAvatar } from "../../loaders/multer";

const router = Router();

router.post("/upload-avatar", uploadAvatar, (req, res) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file;

    res.json({path: `/public/${filename}`});
});

export default router;
