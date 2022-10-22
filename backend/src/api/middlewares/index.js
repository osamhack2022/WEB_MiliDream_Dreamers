// 사용자 정의 미들웨어를 모아서 정리하는 파일
export function checkUserId(req, res, next) {
	if (!/^[0-9]+$/.test(req.params.userId ?? "")) {
		res.status(400).json({ err: "userId should be integer" });
		return;
	}
	next();
}

export function checkUserExist(req, res, next) {
	if (!req.user) {
		res.status(401).json({ err: "Unauthorized!" });
		return;
	}
	next();
}
