import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import Logger from "./logger";
import fs from "fs";

dotenv.config();

const IMAGE_PATH = path.resolve('./public/images');

// 디렉토리가 없을 경우 경로에 새로운 디렉토리 추가
try {
	fs.readdirSync(IMAGE_PATH);
} catch (error) {
	Logger.error('❌Not exist direcotry');
	fs.mkdirSync(IMAGE_PATH, { recursive: true });
}

/**
 * 파일의 저장경로 및 파일이름 생성 규칙 정의
 */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, IMAGE_PATH);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '_' + uniqueSuffix + '.' + file.mimetype.split("/")[1] ?? "");
	}
})
/**
 * 이미지 파일 업로드에 대한 multer 세팅
 */
export const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 5MB 제한
	fileFilter: function (req, file, done) { // 이미지 형식 파일만 필터링
		if (file.mimetype.includes("image")) {
			done(null, true); // 파일 허용
		} else {
			done(null, false); // 파일 거부
		}
	},

});