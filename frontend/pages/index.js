// 기본 라우팅 경로입니다. (/) 으로 접속했을 때 보여지는 페이지
import Link from "next/link";

import Image from "next/image";
import Slide from "../components/Home/Slide";
import Service_1 from "../components/Home/Service_1";
import Service_2 from "../components/Home/Service_2";

export default function Home() {
  return (
    <div className="Home_home">
      <div className="FIRST">
        {/* 가장 위 position으로 전체 위치 조절가능 */}
        <div style={{ position: "relative", top: "300px", left: "50px" }}>
          <img class="front" src="/img/home/intro_2.svg" />
          <div style={{ position: "absolute", top: "-320px", left: "140px" }}>
            <img class="back" src="/img/home/intro_1.svg" />
          </div>
          <div style={{ position: "absolute", top: "170px", left: "350px" }}>
            <img class="third" src="/img/home/intro_3.svg" />
          </div>
        </div>
        <div>
          <h1
            style={{
              position: "absolute",
              top: "320px",
              left: "300px",
              fontSize: "90px",
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

        <Link href="/login">
          <button>시작하기</button>
        </Link>

        <style jsx>
          {`
            .Home_home {
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
              color: #a593e0;
              cursor: pointer;
              border-radius: 40px 40px;
              border-color: #a593e0;
              border: solid;
              top: 518px;
              left: 970px;
              outline: 0;
              font-weight: bold;
              font-size: 25px;
              width: 180px;
              height: 62px;
              opacity: 1;
            }
            button:hover {
              // 호버 시 색변환 천천히 주는거 넣을 예정
              background-color: #a593e0;
              color: #ffffff;
              border-color: #a593e0;

              transition-duration: 2ms;
              transition-delay: 2ms;
            }
            .FIRST {
              width: 100vw;
              height: 85vh;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              background-color: #a593e0;
              background: rgb(255, 255, 255);
              background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 1) 0%,
                rgba(165, 147, 224, 1) 90%
              );
              opacity: 0.9; /* 80% 불투명도 */
            }
            h1 {
              color: white;
            }
            p {
              color: white;
              position: relative;
              top: -80px;
              left: 980px;
              font-size: 20px;
              font-weight: 400;
              filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
              opacity: 1;
            }
          `}
        </style>
      </div>

      <div className="SECOND">
        {
          <div>
            <Slide></Slide>
          </div>
        }
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

      <footer clasName="footer">
        <div
          style={{
            position: "absolute",
            top: "3000px",
            width: "100%",
            backgroundColor: "#566270",
            height: "96px",
          }}
        >
          <img
            src="/img/Footer/Footer(Simply).svg"
            style={{
              backgroundColor: "#566270",
            }}
          />
          {/* <a>
            <br /> Copyrightⓒ 2022, Dreamers. All right reserved
          </a> */}
        </div>
        <style jsx>{`
          .footer {
          }
          div {
            text-align: center;
            justify-content: center;
          }
          a {
            font-size: 13px;
            color: #ffffff;
          }
          img {
            border: 0;
          }
        `}</style>
      </footer>
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
