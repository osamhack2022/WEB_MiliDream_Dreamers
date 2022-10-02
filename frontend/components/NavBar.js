import Link from "next/link";
//next.js에서 react처럼 페이지 간 이동을 위해서 <Link> 컴포넌트를 꼭 써야 한다.
import { useRouter } from "next/router";

//만약 로그인된 상태라면 로그아웃을 출력해야 함.
export default function NavBar() {
    const router = useRouter();
    return (
      <header>
        <nav>
          <Link href="/">
            <img src="/img/logo.png" />
          </Link>
          <ul>
            <li>
              <Link href="/board">
                <a>게시판</a>
              </Link>
            </li>
            <li>
              <Link href="/career/contest">
                <a>career_contest</a>
              </Link>
            </li>
            <li>
              <Link href="/career/survey">
                <a>career_survey</a>
              </Link>
            </li>

            <li>
              <Link href="/user/accounts">
                <a>user</a>
              </Link>
            </li>
            <li>
              <Link href="/popup/0">
                <a>popup</a>
              </Link>
            </li>
            <li>
              <Link href="/map">
                <a>map</a>
              </Link>
            </li>
          </ul>

          {/*styled jsx 방식 : js 백틱을 이용해 일반 css 코드를 삽입할 수 있다. 하지만 이 css가 적용받는 범위는 함수 내부로 한정된다.*/}
          <style jsx>
            {`
              nav {
                height: 107px;
                line-height: 150px;
              }
              img {
                width: 80px;
                cursor: pointer;
                padding-left: 50px;
              }
              ul {
                float: right;
                list-style: none;
                padding: 0;
                display: flex;
                padding-right: 60px;
              }
              a {
                color: #000000;
                display: block;
                height: 70px;
              }
              a:hover {
                color: #8a939c;
                transition-duration: 2ms;
                transition-delay: 2ms;
              }
              li {
                margin: 0px 16px;
                width: 30;
                font-size: 16px;
                font-weight: 318;
                line-height: 100px;
                padding-left: 30px;
              }
            `}
          </style>
        </nav>
      </header>
    );
  }
  
  // li의 line-height는 로그인 등 헤더의 txt 부분 높이 조절
  // nav의 line-height는 로고 아이콘 부분 높이 조절