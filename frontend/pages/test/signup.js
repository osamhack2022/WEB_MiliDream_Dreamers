import { useRouter } from "next/router";
import { useContext } from "react";
import { TestNavBar } from "./_component";
import { myContext } from "./_hook";

async function getToken() {
	const response = await fetch("/api/accounts/signup-token");
	if (response.ok) {
		const data = await response.json();
		return data.join_token;
	}
	return null;
}

export default function SignupPage() {
	const { canAPI, addUser } = useContext(myContext);

	const router = useRouter();
	const onSubmit = async (e) => {
		e.preventDefault();

		const body = {
			userId: e.currentTarget.userId.value,
			password: e.currentTarget.password.value,
			userName: e.currentTarget.userName.value,
			userClass: 1,
		};

		if (canAPI) {
			const token = await getToken();
			console.log("token:", token);
			const response = await fetch("/api/accounts/account", {
				method: "POST",
				body: JSON.stringify({
					...body,
					token,
				}),
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				return;
			}
		} else {
			addUser(body);
		}

		router.push("/test");
	};
	return (
		<>
			<TestNavBar />
			<form onSubmit={onSubmit}>
				<label>
					<span>id</span>
					<input type="text" name="userId" required />
				</label>
				<label>
					<span>userName</span>
					<input type="text" name="userName" required />
				</label>
				<label>
					<span>Password</span>
					<input type="password" name="password" required />
				</label>
				<label>
					<span> Re enter Password</span>
					<input type="password" name="repassword" required />
				</label>
				<div className="submit">
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</>
	);
}
