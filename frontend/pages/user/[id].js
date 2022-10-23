import React from "react";
import ReactDOM from "react-dom";

import { useRouter } from "next/router";
import ProgressBar from "../../components/user/Progress_bar";

export default function user_id() {
  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        left: "90px",
      }}
    >
      {/* <h1>[id]에 따른 각 유저 정보/프로필 페이지</h1> */}
      <div>
        <h1 style={{}}>유저 프로필 및 정보</h1>
        <h3>내 프로필 및 나에 대한 정보를 보거나 관리하는 페이지입니다.</h3>
      </div>
      <form
        style={{
          width: "1200px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          margin: "0 auto",
          padding: "50px",
        }}
      >
        <div class="container" style={{ display: "flex" }}>
          <div class="item_A" style={{ display: "flex", width: "300px" }}>
            <img src="/img/user/profile_none.svg"></img>
          </div>
          <div
            class="item_B"
            style={{
              fontSize: "25px",
              flex: "1",
              fontWeight: "500",
            }}
          >
            [id]
            <div class="wordbox">
              <div
                class="word"
                style={{
                  display: "inline-block",
                  width: "900px",
                  whiteSpace: "nowrap",
                  fontSize: "20px",

                  overflow: "hidden",
                  textOverflow: "ellipsis",

                  //줄 기준으로 자르기 style
                  whiteSpace: "normal",
                  lineHeight: "1.2",
                  height: "4.8em",
                }}
              >
                <br></br>
                시들어 너의 할지니, 듣는다. 위하여 앞이 그들을 풀이 것이다.
                우리의 만물은 간에 그것을 품에 갑 아니한 뜨고, 아름다우냐? 거친
                뭇 튼튼하며, 것이다. 속에 방황하였으며, 보내는 이상의 피어나는
                것이다. 같으며, 속에 이상을 찾아다녀도, 살았으며, 아니한
                아름다우냐? 광야에서 무한한 꽃이 곳이 부패뿐이다. 하였으며,
                소리다.이것은 두기 내는 그들을 미인을 뼈 놀이 밝은 칼이다.
                청춘의 이상의 청춘 약동하다. 없으면 피고 인간의 만천하의 수 어디
                것이다. 가치를 눈에 부패를 것이다.
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        <ProgressBar />
      </div>
    </div>
  );
}