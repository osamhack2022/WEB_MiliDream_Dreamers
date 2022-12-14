// 기본 라우팅 경로입니다. (/) 으로 접속했을 때 보여지는 페이지
import Link from "next/link";

import Image from "next/image";
import Slide from "../components/Home/Home_Slide";
import Service_1 from "../components/Home/Service_1";
import Service_2 from "../components/Home/Service_2";
import BoardCenter from "../components/Home/slideslide";
import LoginModal from "../components/Login/Modal";
import BoardCenter2 from "../components/board/BoardCenter";
import Footer from "../components/Footer"
import { GlobalState } from "../states/GlobalState";


export default function Home({ results }) {
	const user = GlobalState(state => state.user);

	return (
		<div>
			<div className="Home_home">
				<div className="FIRST">
					{/* 가장 위 position으로 전체 위치 조절가능 */}
					<div style={{ position: "relative", top: "300px", left: "140px", width: "700px" }}>
						<Image width="269px" height="370px" className="front" src="/img/home/intro_2.svg" />
						<div style={{ position: "absolute", top: "-310px", left: "140px" }}>
							<Image width="598px" height="456px" className="back" src="/img/home/intro_1.svg" />
						</div>
						<div style={{ position: "absolute", top: "170px", left: "350px" }}>
							<Image width="329px" height="331px" className="third" src="/img/home/intro_3.svg" />
						</div>
					</div>
					<div>
						<h1
							style={{
								position: "absolute",
								top: "320px",
								left: "350px",
								fontSize: "90px",
								fontWeight: "Bold",
							}}
						>
							MILI-<br></br>DREAM
						</h1>
					</div>
					<div>
						<p>
							본인만의 군생활 유형으로 꿈을 설계해보세요.<br></br>군 장병
							여러분들의 MILI-DREAM을 이루시길 응원합니다!
						</p>
					</div>
					{!user
						? <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal">시작하기</button>
						: <Link href="/board"><button type="button">시작하기</button></Link>}
					<Link href="/career/survey">
						<button className="rightNowStart" type="button" >바로 유형검사!</button>
					</Link>
					<style jsx>
						{`
						.rightNowStart {
							margin-left: 200px;
							width: 230px;
						}
            .FIRST {
              opacity: 0.9;
            }
            .back {
              top: 50px;
              left: 50px;
            }
            .third {
              position: absolute;
              top: 0px;
              left: 400px;
            }
            button {
              position: absolute;
              background-color: #ffffff;
              color: #7a6aad;
              cursor: pointer;
              border-radius: 40px 40px;
              border-color: #7a6aad;
              border: solid;
              top: 518px;
              left: 1070px;
              outline: 0;
              font-weight: bold;
              font-size: 25px;
              width: 180px;
              height: 62px;
              opacity: 1;
              transition: 1s;
            }
            button:hover {
              // 호버 시 색변환 천천히 주는거 넣을 예정
              background-color: #a593e0;
              color: #ffffff;
              border-color: #fff;
              color: white;
              transition: 1s;
            }
            .FIRST {
              height: 755.19px;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              background-color: #a593e0;
              // background: rgb(255, 255, 255);
              // background: linear-gradient(
              //   0deg,
              //   rgba(255, 255, 255, 1) 0%,
              //   rgba(165, 147, 224, 1) 90%
              // ); /* 80% 불투명도 */
            }
            h1 {
              color: white;
            }
            p {
              color: white;
              position: relative;
              top: -80px;
              left: 1080px;
              font-size: 22px;
              font-weight: Bold;
              text-shadow: 2px 2px 2px gray;
              opacity: 1;
			  width: 600px;

            }
          `}
					</style>
				</div>

				<div className="SECOND">
					<div className="slide-board">
						<BoardCenter2 />
						<style global jsx>{`
							#carousel-box {
								display: flex;
								justify-content: center;
								margin-top: 300px;
							}
							.slide-board {
								background-color: #e4e7df;
							}
						`}</style>
					</div>
					{/* {
						<div>
							<Slide></Slide>
						</div>
					} */}
				</div>

				<div className="THIRD">
					{
						<div
							style={{
								position: "absolute",
								top: "100px",
								width: "100%",
							}}
						>
							<Service_1></Service_1>
						</div>
					}
					{
						<div
							style={{
								position: "absolute",
								top: "500px",
								width: "100%",
							}}
						>
							<Service_2></Service_2>
						</div>
					}
				</div>

				{/* <Footer /> */}
			</div>
		</div>
	);
}

//STYLE JSX 써서 HOME 이미지 넣는다.

/*SSR을 위한 함수. 여기 작성하는 코드들은 서버에서 동작한다. (==클라이언트에서 보이지 않음)
 * 함수 이름을 변경하면 안됨.
 * object를 return 하며, 이 안에는 props라는 key가 있으며, 이 안에 원하는 데이터를 넣을 수 있음.
 */
/*
export async function getServerSideProps() {
	const { results } = await (await fetch(``)).json();
	return {
		props: {
			results,
		}
	}
}
*/
