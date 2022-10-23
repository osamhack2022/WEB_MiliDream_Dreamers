import React, { Component } from "react";
import { ReactDOM } from "react";
import styled, { keyframes } from "styled-components";
import { css } from "styled-components";

const style = css`
  body {
    background-color: #fff;
    color: #000000;
  }

  .container {
    max-width: 1200px;
    margin: 50px auto;
    h1 {
      text-align: center;
    }
  }            
  .progressbar-container {
    position: relative;
    width: 100%;
    height: 50px;
    border: 2px solid #000000;
    border-radius: 30px;
    border-color : #A7A7A7;
    display: flex;
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
z-index: 1;
width: 70px;
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
z-index: 2;
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

//아래는 입력 받아오면 됨.
const goalDate = new Date("2023-04-11").getTime();
const startDate = new Date("2021-10-12").getTime();

class ProgressBar extends Component {
  getProgress() {
    const now = new Date().getTime();
    return Math.round(((now - startDate) / (goalDate - startDate)) * 100);
  }

  render() {
    const progress = this.getProgress();
    return (
      <>
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Year progress</h1>
          <div className="progressbar-container">
            <div
              className="progressbar-complete"
              style={{ width: `${progress}%` }}
            >
              <div className="progressbar-liquid"></div>
            </div>

            <span
              className="progress"
              style={{ zIndex: "100", color: "#000000", fontSize: "20px" }}
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