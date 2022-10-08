import React from "react";
import '../css/default.css'
import '../css/main.css'
import '../css/qna.css'
import '../css/animation.css'
import '../css/result.css'
import qnaList from '../data/question.js'
import infoList from '../data/answer.js'

const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];


const cal = () => {
  let result = select.indexOf(Math.max(...select));
  console.log(result);
  return result;
}


const setResult = () => {
  let point = cal();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;
  
  let resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  let imgURL = `${process.env.PUBLIC_URL}/img/image-${point}.png`;
  console.log(imgURL);
  resultImg.src = (imgURL);
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);
  
  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
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
    for(let i=0; i<children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s"
      children[i].style.animation = "fadeOut 0.5s"
    }
    setTimeout(() => {
      let target = qnaList[qID].a[index].type;
      for(let i=0; i<target.length; i++){
        select[target[i]] += 1
      }
      
      for(let i=0; i<children.length; i++){
        children[i].style.display = "none";
      }
      goNext(++qID);
    }, 450)
  })
}


const goNext = (qID) => {
  if(qID===endPoint){
    goResult();
    return;
  }
  let q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qID].q;
  for(let i in qnaList[qID].a){
    addAnswer(qnaList[qID].a[i].answer, qID, i);
  }
  let status = document.querySelector(".statusBar");
  status.style.width = (100/endPoint) * (qID+1) + '%';
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
          <img src={process.env.PUBLIC_URL + './img/main.png'} alt="mainImage" className="img-fluid" />
        </div>
        <p>
          Milidream MBTI Test<br/>
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
          <div className="statusBar">
          </div>
        </div>
        <div className="qBox my-5 py-3 mx-auto">
        </div>
        <div className="aBox">
        </div>
      </section>
      <section id="result" className="mx-auto mt-5 py-5 px-3">
        <h1>당신의 결과는...?!</h1>
        <div className="resultName">
        </div>
        <div id="resultImg" className="my-3 col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
        </div>
        <div className="resultDesc">
        </div>
        <button type="button" className="kakao mt-3 px-3 py-2">공유하기</button>
      </section>
    </div>
  );
};
export default Home;