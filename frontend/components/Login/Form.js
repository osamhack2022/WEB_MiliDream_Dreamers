import { Fragment, SyntheticBaseEvent } from "react";

export default function LoginForm({ token }) {
	return (
		<Fragment>
			<form onSubmit={login}>
				<input type="text" name="id"></input>
				<input type="text" name="password"></input>
				<input type="submit" value="로그인"></input>
				<input type="hidden" name="token" value={token}></input>
			</form>
		</Fragment >
	)
}

/**
 * @param {SyntheticBaseEvent} event
 */
function login(event) {
	event.preventDefault();
	const form = event.target;
	debugger;
	if (!form) return false; // not from form

	const { id, password } = { id: form?.id.value, password: form?.password.value };
	// TODO: login
}