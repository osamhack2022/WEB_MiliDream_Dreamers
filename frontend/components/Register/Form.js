import axios from "axios";
import { Fragment, SyntheticEvent } from "react";

export default function RegisterForm({ token }) {
	return (
		<Fragment>
			<form onSubmit={register}>
				<input type="text" name="id"></input>
				<input type="password" name="password"></input>
				<input type="text" name="userName"></input>
				<select name="userClass">
					<option value="1">미정</option>
					<option value="2">병사</option>
					<option value="3">간부</option>
					<option value="4">군무원</option>
				</select>
				<input type="submit" value="회원가입"></input>
				<input type="hidden" name="token" value={token}></input>
			</form>
		</Fragment >
	)
}

/**
 * @param {SyntheticEvent<HTMLFormElement>} submitEvent
 */
async function register(submitEvent) {
	submitEvent.preventDefault();
	const form = submitEvent.target;
	if (!form) return false;

	const data = {
		userId: form?.id.value,
		password: form?.password.value,
		token: form?.token.value,
		userName: form?.userName.value,
		userClass: form?.userClass.value
	};
	const response = await axios.post("/api/accounts/account", data, { validateStatus: false });
	debugger;
	if (response.status == 200) {
		const registeredData = { id: data.userId, password: data.password };
		await axios.post("/api/accounts/sign", registeredData, { validateStatus: false });
		// TODO: 회원가입 성공 메시지 출력?
		location.href = "/";
	} else {
		console.error(response.data);

	}
}