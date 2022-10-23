import Layout from "../components/Layout";
import "../styles/globals.css";

/* 전역적인 component를 추가하는 곳. 
 * 이곳에 추가된 component (예로, NavBar 등)들은 
  모든 하위 페이지들이 로딩되기 이전에 먼저 로딩되어 실행된다. */
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
