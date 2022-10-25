import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
// import "../public/static/font/style.css";

/* 전역적인 component를 추가하는 곳. 
 * 이곳에 추가된 component (예로, NavBar 등)들은 
  모든 하위 페이지들이 로딩되기 이전에 먼저 로딩되어 실행된다. */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1920px" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
