import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useMyContext } from "./_hook";

export function TestNavBar() {
	const { user, canAPI, setUser } = useMyContext();
	const router = useRouter();

	const handleLogout = async (e) => {
		e.preventDefault();

		if (canAPI) {
			const response = await fetch("/api/accounts/sign", {
				method: "DELETE",
			});
			if (response.ok) {
				setUser(undefined);
			}
		} else {
			setUser(undefined);
		}

		router.push("/test");
	};
	return (
		<ul>
			<li>
				<Link href={"/test"}>
					<a>Home</a>
				</Link>
			</li>
			{user ? (
				<>
					<li>
						<Link href={"/test/profile"}>
							<a>Profile</a>
						</Link>
					</li>
					<li>
						<a onClick={handleLogout}>Logout</a>
					</li>
				</>
			) : (
				<>
					<li>
						<Link href={"/test/signup"}>
							<a> Sign Up </a>
						</Link>
					</li>
					<li>
						<Link href={"/test/login"}>
							<a>Login</a>
						</Link>
					</li>
				</>
			)}
		</ul>
	);
}

export function Posting({ careerPostKey, reloadPost }) {
	const { getPostFromAPI } = useMyContext();
	const categoryKey = useRef();
	const title = useRef();
	const body = useRef();
	const onSubmit = async (e) => {
		e.preventDefault();
		const fetchBody = {
			categoryKey: categoryKey.current.value,
			title: title.current.value,
			body: body.current.value,
			careerPostKey,
		};

		const response = await fetch("/api/board", {
			method: "POST",
			body: JSON.stringify(fetchBody),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			categoryKey.current.value = "";
			title.current.value = "";
			body.current.value = "";
			if (!careerPostKey) {
				getPostFromAPI();
			} else {
				reloadPost();
			}
		} else {
			const data = await response.json();
			console.log("err:", data);
		}
	};

	const handleCategoryKey = () => {
		if (careerPostKey) {
			categoryKey.current.value = "2";
		} else if (categoryKey.current.value === "2") {
			categoryKey.current.value = "3";
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<label>
				<span>CategoryKey</span>
				<input
					type="number"
					name="CategoryKey"
					ref={categoryKey}
					required
					onChange={handleCategoryKey}
				/>
			</label>
			<label>
				<span>Title</span>
				<input type="text" name="title" ref={title} required />
			</label>
			<label>
				<span>Body</span>
				<textarea name="body" ref={body} required />
			</label>
			<div className="submit">
				<button type="submit">Post</button>
			</div>
		</form>
	);
}
