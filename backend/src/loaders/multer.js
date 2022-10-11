import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

export default function (app) {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, '../../public/images');
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix)
		}
	})

	const upload = multer({ storage: storage });
}