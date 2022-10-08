var UserClass = {};
UserClass[UserClass["미정"] = 1] = "미정";
UserClass[UserClass["병사"] = 2] = "병사";
UserClass[UserClass["간부"] = 3] = "간부";
UserClass[UserClass["군무원"] = 4] = "군무원";

export default {
	userIdRegex: /^[0-9a-z]{5,15}$/,
	// 소문자, 숫자만 가능하며 5~15글자
	userPwRegex: /(?=.*[a-z])(?=.*[0-9])(?=^[\x21-\x7E]{8,32}$).*/,
	// 소문자, 숫자 필요, 띄어쓰기를 제외한 ASCII 문자 8~32글자
	userNicknameRegex: /^[0-9a-zA-Z가-힣]{2,20}$/,
	// 영문, 숫자, 한글(완성형) 2~20글자
	UserClass
}