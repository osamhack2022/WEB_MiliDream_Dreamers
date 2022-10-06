// 사용자 정의 미들웨어를 모아서 정리하는 파일
export function checkUserId(req, res, next) {
	const userId = Number(req.params.userId);
	if (!Number(userId)) {
		return next(new Error("userId should be integer"));
	}
	return next();
}
