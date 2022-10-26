import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useEffect } from 'react';
// import "../public/static/font/style.css";

/* 전역적인 component를 추가하는 곳. 
 * 이곳에 추가된 component (예로, NavBar 등)들은 
  모든 하위 페이지들이 로딩되기 이전에 먼저 로딩되어 실행된다. */
export default function App({ Component, pageProps }) {
	
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js";
		script.crossOrigin = "anonymous";
		script.integrity = "sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL";
		script.asnyc = true;
		document.body.appendChild(script);
		return () => document.body.removeChild(script);
	}, []);
	
	return (
		<>
			<Head>
				<meta name="viewport" content="width=1920" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
