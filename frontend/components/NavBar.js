import Link from "next/link";
//next.js에서 react처럼 페이지 간 이동을 위해서 <Link> 컴포넌트를 꼭 써야 한다.
import { useRouter } from "next/router";

export default function NavBar() {
    const router = useRouter();
    return (
        <nav>
            <Link href="/">
                <a className={router.pathname === "/" ? "active" : ""}>Home</a>
            </Link>
            <Link href="/about">
                <a className={router.pathname === "/about" ? "active" : ""}>About</a>
            </Link>

            {/*styled jsx 방식 : js 백틱을 이용해 일반 css 코드를 삽입할 수 있다. 하지만 이 css가 적용받는 범위는 함수 내부로 한정된다.*/}
            <style jsx>{`
                nav {
                    background-color: tomato;
                }
                a {
                text-decoration: none;
                }
                .active {
                color: blue;
                }
            `}</style>
        </nav>
    )
}