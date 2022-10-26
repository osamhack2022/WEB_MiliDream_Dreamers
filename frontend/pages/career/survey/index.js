import React from "react";
import qnaList from '../../../data/newQuestion.js'
import infoList from '../../../data/newAnswer.js'
import studyList from '../../../data/newStudy.js'


const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0];
const subject = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


const cal = (num) => {
  let result = 0;
  if (num === 1) {
    result = select.indexOf(Math.max(...select));
  } else {
    result = subject.indexOf(Math.max(...subject));
  }
  return result;
}

const setResult = () => {
  console.log(select, subject);
  let point = cal(1);
  let rec = cal(0)
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = `[ ${infoList[point].name} ]`;

  let resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  let imgURL = `/img_new/image-${point}.png`;
  console.log(imgURL);
  resultImg.src = (imgURL);
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  let int_Name = document.querySelector('.int_Name');
  int_Name.innerHTML = `[ ${studyList[rec].name} ]`;

  let int_Desc1 = document.querySelector('.int_Desc1');
  int_Desc1.innerHTML = studyList[rec].desc1;

  let int_Desc2 = document.querySelector('.int_Desc2');
  int_Desc2.innerHTML = studyList[rec].desc2;

  const resultDesc1 = document.querySelector('.resultDesc1');
  resultDesc1.innerHTML = infoList[point].desc1;

  const resultDesc2 = document.querySelector('.resultDesc2');
  resultDesc2.innerHTML = infoList[point].desc2;

  const resultDesc3 = document.querySelector('.resultDesc3');
  resultDesc3.innerHTML = infoList[point].desc3;
}


const goResult = () => {
  const result = document.querySelector("#result")
  const qna = document.querySelector("#qna");
  qna.style.WebkitAnimation = "fadeOut 1s"
  qna.style.animation = "fadeOut 1s"
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s"
    result.style.animation = "fadeIn 1s"
    setTimeout(() => {
      result.style.display = "block"
      qna.style.display = "none"
    }, 450);
  }, 450);
  setResult();
}


const addAnswer = (answerText, qID, index) => {
  let a = document.querySelector('.aBox')
  let answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener('click', () => {
    let children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s"
      children[i].style.animation = "fadeOut 0.5s"
    }
    setTimeout(() => {
      let target = qnaList[qID].a[index].type;
      for (let i = 0; i < target.length; i++) {
        if (target[i] === '6') {
          let value = qnaList[qID].a[index].diff;
          for (let j = 0; j < value.length; j++) {
            subject[value[j]] += 1
          }
        } else {
          select[target[i]] += 1
        }
      }

      for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
      }
      goNext(++qID);
    }, 450)
  })
}


const goNext = (qID) => {
  if (qID === endPoint) {
    goResult();
    return;
  }
  let q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qID].q;
  for (let i in qnaList[qID].a) {
    addAnswer(qnaList[qID].a[i].answer, qID, i);
  }
  let status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qID + 1) + '%';
}


const begin = () => {
  let main = document.querySelector("#main");
  let qna = document.querySelector("#qna")
  main.style.WebkitAnimation = "fadeOut 1s"
  main.style.animation = "fadeOut 1s"
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s"
    qna.style.animation = "fadeIn 1s"
    setTimeout(() => {
      qna.style.display = "block"
      main.style.display = "none"
    }, 450);
    let qID = 0;
    goNext(qID);
  }, 450);
}


const Home = () => {
  return (
    <div className="container">
      <section id="main" className="mx-auto mt-5 py-5 px-3">
        <h1>성격유형 알아보기</h1>
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
          <img id="logo" src={'/img_new/logo.png'} alt="logoImage" className="img-fluid" />
        </div>
        <p id="intro">
          Milidream MBTI Test<br />
          아래 Start 버튼을 눌러 검사를 시작해주세요.
        </p>
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => begin()}
        >Start!!</button>
      </section>
      <section id="qna">
        <div className="status mx-auto mt-5">
          <p className="name mx-auto">Milidream</p>
          <div className="statusBar">
          </div>
        </div>
        <div className="qBox py-3 mx-auto">
        </div>
        <div className="aBox">
        </div>
      </section>
      <section id="result" className="mx-auto my-5 py-5 px-3">
        <h1 className="resultTitle">당신의 결과는...?!</h1>
        <div className="resultName">
        </div>
        <div id="resultImg" className="my-3 col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
        </div>
        <div className="text resultDesc1">
        </div>
        <div className="text resultDesc2">
        </div>
        <div className="text resultDesc3">
        </div>
        <div className="summary int_Name">
        </div>
        <div className="text int_Desc1">
        </div>
        <div className="text int_Desc2">
        </div>
        <style global jsx>
          {`
            * {
              font-family: 'Gowun Dodum', sans-serif;
            }
            body {
              background-color: #def3fa !important;
            }
            #main {
              background-color: white;
              width: 80%;
              text-align: center;
              border-radius: 20px;
            }
            #logo {
              width: 75%;
              margin-top: 50px;
              margin-bottom: 30px;
            }
            #intro {
              font-size: 22px;
              margin-top: 40px;
              margin-bottom: 50px;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @-webkit-keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @-webkit-keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            .fadeIn {
              animation: fadeIn;
              animation-duration: 0.5s;
            }
            .fadeOut {
              animation: fadeOut;
              animation-duration: 0.5s;
            }
            #qna {
              display: none;
              height: 100%;
            }
            .designBox {
              background-color: #566270;
              text-align: center;
              font-size: 24px;
              color: white;
              width: 70%;
            }
            .qBox {
              border-color: #e1bfff;
              text-align: center;
              border-radius: 20px;
              font-size: 24px;
              width: 70%;
              margin-top: 4em;
              margin-bottom: 4em;
              height: 10em;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }
            .aBox {
              bottom: 20px;
            }
            .answerList {
              background-color: #e1bfff;
              border-radius: 20px;
              display: block;
              width: 70%;
              border: 0px;
              font-size: 20px;
            }
            .answerList:hover,
            .answerList:focus {
              background-color: #fba58c;
              color: black;
            }
            .name {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              font-size: 30px;
              color: white;
            }
            .status {
              height: 20px;
              width: 70%;
              background-color: #ebe9e8;
              border-radius: 20px;
              padding-bottom: 45px;
            }
            .statusBar {
              height: 100%;
              border-radius: 20px;
              background-color: #566270;
              padding-bottom: 45px;
            }
            #result {
              display: none;
              background-color: white;
              width: 80%;
              text-align: center;
              border-radius: 20px;
            }
            .resultTitle {
              font-weight: bold;
            }
            .resultName {
              font-size: 26px;
              margin-top: 40px;
              font-weight: bold;
            }
            #resultImg {
              padding-top: 20px;
              padding-bottom: 25px;
            }
            .text,
            .summary {
              font-size: 20px;
              padding: 30px 40px 10px 40px;
            }
            .summary {
              font-weight: bold;
            }
            .int_Desc2,
            .resultDesc3 {
              padding-bottom: 25px;
            }
            .goBack {
              color: white;
              background-color: #e1bfff;
              padding-top: 30px;
              font-size: 20px;
              border: 0px;
              border-radius: 20px;
            }
            .goBack:hover,
            .goBack:focus {
              background-color: #fba58c;
              color: black;
            }
          `}
        </style>
      </section>

    </div>
  );
};
export default Home;
