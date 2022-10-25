// @ts-check

/**
 * Path Parameter에 있는 UserId가 숫자로만 이루어져 있는지 점검합니다.
 * 숫자로만 이루어지지 않았다면 `400`에러와 오류 메시지를 보내고 사이클을 종료합니다.
 * 세팅되었다면 이어 실행합니다.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export function checkUserId(req, res, next) {
	if (!/^[0-9]+$/.test(req.params.userId ?? "")) {
		res.status(400).json({ err: "userId should be integer" });
		return;
	}
	next();
}
/**
 * req.user가 세팅되었는지를 검사합니다.
 * 세팅되지 않았다면 `401`에러와 오류 메시지를 보내고 사이클을 종료합니다.
 * 세팅되었다면 이어 실행합니다.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns
 */
export function checkUserExist(req, res, next) {
	if (!req.user) {
		res.status(401).json({ err: "Unauthorized!" });
		return;
	}
	next();
}
