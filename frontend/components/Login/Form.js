import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Fragment, SyntheticBaseEvent } from "react";

export default function LoginForm() {
  return (
    <Fragment>
      <div className="login wrapper">
        <div className="login left">
          <div className="lock">
            <span>
              <Image
                src={"/img/Login/lock_round_icon-03.png"}
                width={10}
                height={11}
                style={{ position: "relative" }}
              ></Image>
            </span>
            <div className="ellipse"></div>
          </div>
          <span className="login-text">로그인</span>
          <span className="login-hint-text">
            밀리드림에서 장병 여러분의 미래를 설계하세요
          </span>
          <form className="loginForm" onSubmit={login}>
            <div className="text-input-box">
              <label htmlFor="id" className="form-label">
                아이디
              </label>
              <input className="form-control" type="text" name="id"></input>
            </div>
            <div className="text-input-box">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
              ></input>
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                name="saveId"
              />
              <label className="form-check-label" htmlFor="saveId">
                아이디 기억하기
              </label>
              <Link href={"/reset-password"}>
                {/* TODO: 미구현 */}
                <a>기억이 안나시나요?</a>
              </Link>
            </div>
            <a
              onClick={login}
            >
              <div className="login-btn">
                <span>로그인</span>
              </div>
            </a>
            <a onClick={()=>location.href="/signup"}>
              <div className="signup-btn">
                <span>회원가입</span>
              </div>
            </a>
            {/* <button>회원가입</button> */}
            {/* SSO 로그인?? */}
          </form>
        </div>
        <div className="login right">
          <Image
            src={"/img/Login/image_10.jpg"}
            height="415"
            width="353"
            style={{
              borderRadius: "20px",
              filter: "brightness(0.65)",
            }}
          ></Image>
        </div>
      </div>
      <style jsx>{`
        .login.wrapper {
          position: absolute;
          top: 200px;
          margin: 0 67px;
        }
        .login.left {
          float: left;
          width: 387px;
        }
        .login.right {
          display: inline-block;
        }
        .loginForm {
        }
        .ellipse {
          z-index: 1;
          position: absolute;
          width: 19px;
          height: 19px;
          left: 0;
          top: 0;
          border-radius: 50%;

          background: linear-gradient(270deg, #a593e0 0%, #c8f1ff 100%);
        }
        .lock {
          width: 19px;
          height: 19px;
        }
        .lock > span {
          width: 10px;
          height: 11px;
          position: absolute;
          left: 4.5px;
          top: -2px;
          z-index: 10;
        }
        .login-text {
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 33px;
          display: block;
        }
        .login-hint-text {
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          display: block;
          color: #d9d9d9;
        }
        .loginForm label {
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
        }
        .loginForm .text-input-box {
          width: 253px;
        }
        .login-btn {
          box-sizing: border-box;

          position: absolute;
          width: 253px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          left: 67px;
          top: 306px;

          background: linear-gradient(90deg, #c8f1ff 0%, #a593e0 97.67%);
          border-radius: 50px;
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: white;
        }
        .signup-btn {
          position: absolute;
          border: 1.5px solid transparent;
          border-radius: 50%;
          background-image: linear-gradient(#fff, #fff),
            linear-gradient(90deg, #c8f1ff 0%, #a593e0 97.67%);
          background-origin: border-box;
          background-clip: content-box, border-box;
          width: 253px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          left: 67px;
          top: 359px;
          border-radius: 50px;
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #b6c2ef;
        }
      `}</style>
    </Fragment>
  );
}

/**
 * @param {SyntheticBaseEvent} event
 */
async function login(event) {
  if (event) event.preventDefault();
  const form = document.querySelector("form.loginForm");

  const data = { id: form?.id.value, password: form?.password.value };
  const response = await axios.post("/api/accounts/sign", data, {
    validateStatus: false,
  });
  const result = response.data;

  if (response.status == "200") {
    location.href = "/";
  } else {
    console.log(result);
  }
  // TODO: login
}
