import React, { Component, useState } from "react";
import { ReactDOM } from "react";
import styled, { keyframes } from "styled-components";
import { css } from "styled-components";

const style = css`
  body {
    background-color: #fff;
    color: #000000;
  }

  .container_bar {
    max-width: 1300px;
    width : 130%;
    h1 {
      text-align: center;
    }
  }            
  .progressbar-container {
    position: absolute;
    width: 1200px;
    text-align: center;
    margin-left : 40px;
    height: 50px;
    border: 3px solid #000000;
    border-radius: 30px;
    border-color : #A7A7A7;
    display: block;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.progressbar-complete {
     position: absolute;
     left: 0;
     top: 0px;
     height: 100%;
     background-color: #FBA58C;
     border-radius: 10px;
     animation: g 2500ms infinite ease-in-out;
     z-index: 2;
    }

.progressbar-liquid {
z-index: 3;
width: 60px;
height: 70px;
animation: g 2500ms infinite ease-in-out,
r 3000ms infinite cubic-bezier(0.5, 0.5, 0.5, 0.5);
position: absolute;
right: -5px;
top: -10px;
background-color: #FBA58C;
border-radius: 40%;
}
}
.progress {
}
}
}

@keyframes g {

}

@keyframes r {
from {
transform: rotate(0deg);
}
from {
transform: rotate(360deg);
}
}
`;

//아래는 입력을 받아와야 됨.
export const goalDate = new Date("2023-04-11");
export const startDate = new Date("2021-10-12");
export const goal = goalDate.getTime();
export const start = startDate.getTime();

class ProgressBar extends Component {
  getProgress() {
    const now = new Date().getTime();
    return Math.round(((now - start) / (goal - start)) * 100);
  }

  render() {
    const progress = this.getProgress();
    return (
      <>
        <div></div>
        <div className="container_bar">
          {/*<h1 style={{ textAlign: "center" }}>Year progress</h1>*/}
          <div
            className="progressbar-container"
            style={{ boxShadow: "1px 3px 4px 2px #BEBEBE" }}
          >
            <div
              className="progressbar-complete"
              style={{ width: `${progress}%` }}
            >
              <div className="progressbar-liquid"></div>
            </div>

            <span
              className="progress"
              style={{
                position: "absolute",
                zIndex: "100",
                color: "#000000",
                fontSize: "17px",
                marginTop: "15px",
                fontWeight: "Bold",
                // justify-content: center;
                // align-items: center
              }}
            >
              {progress}%
            </span>
            <style jsx>{style}</style>
          </div>
        </div>
      </>
    );
  }
}

export default ProgressBar;