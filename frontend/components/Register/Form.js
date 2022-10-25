import axios from "axios";
import { Fragment, SyntheticEvent } from "react";
import config from "../../config";

export default function RegisterForm({ token }) {
	return (
		<Fragment>
			<div className="signup">
				<div className="wrapper">
					<span className="signup-text">회원가입</span>
					<form onSubmit={register}>
						<div className="text-input-box my-3">
							<label htmlFor="id" className="form-label">
								아이디
							</label>
							<input
								className="form-control"
								type="text"
								name="id"
								autocomplete="username"
								required
								onKeyUp={validateId}
								onBlur={validateIdSS}
							></input>
							<div id="fbId" className="invalid-feedback"></div>
						</div>
						<div className="text-input-box my-3">
							<label htmlFor="password" className="form-label">
								비밀번호
							</label>
							<input className="form-control" type="password" name="password" autoComplete="current-password" required onKeyUp={validatePw}></input>
							<div id="fbPw" className="invalid-feedback"></div>
						</div>
						<div className="text-input-box my-3">
							<label htmlFor="passwordCheck" className="form-label">
								비밀번호 확인
							</label>
							<input className="form-control" type="password" name="passwordCheck" autoComplete="new-password" required onKeyUp={validatePwNew}></input>
							<div id="fbPwNew" className="invalid-feedback"></div>
						</div>
						<div className="text-input-box my-3">
							<label htmlFor="id" className="form-label">
								닉네임
							</label>
							<input className="form-control" type="text" name="userName" autoComplete="nickname" required onKeyUp={validateNick} onBlur={validateNickSS}></input>
							<div id="fbNick" className="invalid-feedback"></div>
						</div>
						<div>
							<label htmlFor="userClass" className="form-label">
								군 구분
							</label>
							<select className="form-select" name="userClass">
								<option value="1" selected>군 구분을 선택해주세요</option>
								<option value="1">미정</option>
								<option value="2">병사</option>
								<option value="3">간부</option>
								<option value="4">군무원</option>
							</select>
						</div>
						<input type="hidden" name="token" value={token}></input>
						<a onClick={register}>
							<div className="signup-btn my-4">
								<span>회원가입</span>
							</div>
						</a>
					</form>
				</div>
			</div>
			<style jsx>{`
				.signup .wrapper {
					position: relative;
					margin: 0 auto;
					width: 640px
				}

				.signup-text {
					font-family: "Noto Sans";
					font-style: normal;
					font-weight: 600;
					font-size: 24px;
					line-height: 33px;
					display: block
				}

				.signup form label,.signup-btn {
					font-family: "Noto Sans";
					font-style: normal;
					font-weight: 400;
					font-size: 12px;
					line-height: 16px;
					color: #000
				}

				.signup-btn {
					box-sizing: border-box;
					position: relative;
					height: 38px;
					line-height: 38px;
					text-align: center;
					margin: 15px auto;
					background: linear-gradient(90deg,#9ee6ff 0,#a593e0 97.67%);
					border-radius: .375rem;
					font-size: 16px;
					color: #fff;
					cursor: pointer
				}
				`}</style>
		</Fragment >
	)
}

/**
 * @param {SyntheticEvent<HTMLFormElement>} event
 */
async function register(event) {
	if (event) event.preventDefault();
	const form = document.querySelector(".signup form");

	const data = {
		userId: form?.id.value,
		password: form?.password.value,
		token: form?.token.value,
		userName: form?.userName.value,
		userClass: form?.userClass.value
	};
	const response = await axios.post("/api/accounts/account", data, { validateStatus: false });
	if (response.status == 200) {
		const registeredData = { id: data.userId, password: data.password };
		await axios.post("/api/accounts/sign", registeredData, { validateStatus: false });
		// TODO: 회원가입 성공 메시지 출력?
		location.href = "/";
	} else {
		console.error(response.data);

	}
}

function validateId(event) {
	const valid = config.userIdRegex.test(event.target.value);
	setValid(event.target.classList, valid);
	if (!valid) document.getElementById("fbPw").innerText = "소문자와 숫자로 이루어진 5~15글자를 입력해주세요"
}
async function validateIdSS(event) {
	const form = document.querySelector(".signup form");
	const data = {
		userId: event.target.value,
		token: form?.token.value
	}
	const response = await axios.post("/api/accounts/attempt", data, { validateStatus: false });
	// debugger;
	if (event.target.classList.contains("is-valid") && response.status != 200) {
		const fb = document.getElementById("fbId");
		fb.innerText = "사용중인 아이디입니다.";
	}
	setValid(
		event.target.classList,
		response.status == 200
	);
}
function validatePw(event) {
	const valid = config.userPwRegex.test(event.target.value)
	setValid(event.target.classList, valid);
	if (!valid) document.getElementById("fbPw").innerText = "영문 소문자와 숫자를 포함한 비밀번호 8~32글자를 입력해주세요"
}
function validatePwNew(event) {
	const valid = document.querySelector(".signup form")?.password.value == event.target.value || event.target.value.length == 0;
	setValid(
		event.target.classList,
		valid
	);
	if (!valid) document.getElementById("fbPwNew").innerText = "비밀번호가 일치하지 않습니다"
}
function validateNick(event) {
	const valid = config.userNicknameRegex.test(event.target.value);
	setValid(event.target.classList,);
	if (!valid) document.getElementById("fbNick").innerText = "영문 소문자, 숫자, 한글만 가능하며 2~20글자를 입력해주세요"
}
async function validateNickSS(event) {
	const form = document.querySelector(".signup form");
	const data = {
		userName: event.target.value,
		token: form?.token.value
	}
	const response = await axios.post("/api/accounts/attempt", data, { validateStatus: false });
	// debugger;
	if (event.target.classList.contains("is-valid") && response.status != 200) {
		const fb = document.getElementById("fbNick");
		fb.innerText = "사용중인 닉네임입니다.";
	}
	setValid(
		event.target.classList,
		response.status == 200
	);
}
function setValid(classList, isValid) {
	classList.remove(isValid ? "is-invalid" : "is-valid");
	classList.add(isValid ? "is-valid" : "is-invalid");
}