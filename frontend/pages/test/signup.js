import { useRouter } from "next/router";
import { TestNavBar } from "./_component";

async function getToken() {
	const response = await fetch("/api/accounts/signup-token");
	if (response.ok) {
		const data = await response.json();
		return data.token;
	}
	return null;
}

export default function SignupPage() {
	const router = useRouter();
	const onSubmit = async (e) => {
		e.preventDefault();

		const body = {
			userId: e.currentTarget.userId.value,
			password: e.currentTarget.password.value,
			userName: e.currentTarget.userName.value,
			userClass: 1,
		};

		const token = await getToken();
		const response = await fetch("/api/accounts/account", {
			method: "POST",
			body: JSON.stringify({
				...body,
				token,
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			const data = await response.json();
			console.log("err:", data);
			return;
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
