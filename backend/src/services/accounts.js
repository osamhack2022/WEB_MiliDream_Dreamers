/**
 *회원가입시 사용되는 토큰을 생성합니다
 *
 * @export
 */
export function generateSigninToken() {
	const error = false;
	if (error) return { success: false, status: 500, error: "회원가입 토큰을 생성할 수 없습니다." };

	// 토큰 생성 로직

	return { success: true, status: 200, join_token: "TestToken" };
}