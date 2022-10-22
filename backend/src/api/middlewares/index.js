// 사용자 정의 미들웨어를 모아서 정리하는 파일
export function checkUserId(req, res, next) {
	if (!/^[0-9]+$/.test(req.params.userId ?? "")) {
		return next(new Error("userId should be integer"));
	}
	return next();
}
