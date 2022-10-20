import Link from "next/link";
import {useRouter} from "next/router";
import { useContext } from "react";
import { TestNavBar } from "./_component";
import { myContext } from "./_hook";

export default function LoginPage(){

	const {setUser, canAPI, db} = useContext(myContext);

	const router = useRouter();
	const onSubmit = async (e) => {
		e.preventDefault();

		const body = {
			id: e.currentTarget.id.value,
			password: e.currentTarget.password.value
		}

		if (canAPI){
		const response = await fetch("/api/accounts/sign", {
			method: "POST",
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		})

		if (!response.ok) return;

		const data = await response.json();

		setUser(data);
	} else {
		let flag = false;
		db.forEach(ele => {
			if (ele.userId === body.id && ele.password === body.password){
				setUser(ele);
				flag = true;
			}
		})
		if (flag === false) return;
	}

		router.push("/test")
	}
	return <>
	<TestNavBar/>
	<form onSubmit={onSubmit}>
          <label>
            <span>id</span>
            <input type="text" name="id" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <div className="submit">
            <button type="submit">Login</button>
            <Link href="/test/signup">
              <a>I don't have an account</a>
            </Link>
          </div>
        </form>
	</>
}