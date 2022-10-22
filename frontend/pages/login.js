//로그인 페이지

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LoginForm from "../components/Login/Form";

export default function Login() {
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      const results = await (await fetch(`/api/accounts/signup-token`, { method: 'GET' })).json();
      if (results.success) setToken(results.join_token);
      else console.error("getTokenFail");
    })();
  }, []);

  console.log(token);

  return (
    <div>
      <LoginForm token={token}></LoginForm>
    </div>
  );
}
