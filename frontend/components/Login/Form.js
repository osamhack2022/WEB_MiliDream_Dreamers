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
            <div className="text-input-box my-3">
              <label htmlFor="id" className="form-label">
                아이디
              </label>
              <input className="form-control" type="text" name="id"></input>
            </div>
            <div className="text-input-box my-3">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
              ></input>
            </div>
            <div className="my-4 form-etc">
              <input
                className="form-check-input"
                type="checkbox"
                name="saveId"
              />
              <label className="form-check-label" htmlFor="saveId">
                &nbsp;&nbsp;아이디 기억하기
              </label>
              <Link href={"/reset-password"}>
                {/* TODO: 미구현 */}
                <a>
                  <span className="forget-text">기억이 안나시나요?</span>
                </a>
              </Link>
            </div>
            <a onClick={login}>
              <div className="login-btn form-btn">
                <span>로그인</span>
              </div>
            </a>
            <a onClick={() => (location.href = "/signup")}>
              <div className="signup-btn form-btn">
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
          <div className="rect">
            <span>
              MILI-DREAM에서<br></br>
              여러분의 꿈을 그리고<br></br>
              도전하세요
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .login.wrapper {
          position: relative;
          margin: 0 auto;
          width: 740px;
        }

        .login.left {
          float: left;
          width: 387px;
        }

        .login.right {
          display: inline-block;
          height: 415px;
        }

        .login.right .rect {
          position: relative;
          width: 279px;
          height: 107px;
          left: 40px;
          top: -259px;
          background: rgba(217, 217, 217, 0.25);
          backdrop-filter: blur(2px);
          border-radius: 20px;
        }

        .login.right .rect > span {
          justify-content: center;
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 23px;
          line-height: 35px;
          display: flex;
          align-items: center;
          color: #fff;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }

        .loginForm,
        .loginForm .form-etc,
        .loginForm .text-input-box {
          width: 277px;
        }

        .ellipse {
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          background: linear-gradient(270deg, #a593e0 0, #c8f1ff 100%);
        }

        .ellipse,
        .lock {
          width: 19px;
          height: 19px;
        }

        .lock > span {
          width: 10px;
          height: 11px;
          position: absolute;
          left: 5px;
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
          font-size: 12px;
          line-height: 16px;
          display: block;
          color: #999;
        }

        .loginForm label {
          font-size: 12px;
          line-height: 16px;
          color: #000;
        }

        .login-hint-text,
        .loginForm .forget-text,
        .loginForm .form-btn,
        .loginForm label {
          font-family: "Noto Sans";
          font-style: normal;
          font-weight: 400;
        }

        .loginForm .forget-text {
          float: right;
          font-size: 9px;
          line-height: 24px;
          text-decoration-line: underline;
          color: #a593e0;
        }

        .loginForm .form-btn {
          position: relative;
          width: 253px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          border-radius: 50px;
          font-size: 12px;
		  cursor: pointer;
        }

        .login-btn {
          box-sizing: border-box;
          margin: 15px auto;
          background: linear-gradient(90deg, #c8f1ff 0, #a593e0 97.67%);
          color: #fff;
        }

        .signup-btn {
          margin: 15px auto;
          border: 1.5px solid transparent;
          background-image: linear-gradient(#fff, #fff),
            linear-gradient(90deg, #c8f1ff 0, #a593e0 97.67%);
          background-origin: border-box;
          background-clip: content-box, border-box;
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
    location.reload();
  } else {
    console.log(result);
  }
  // TODO: login
}
