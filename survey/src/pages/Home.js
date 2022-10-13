import React from "react";
import {Link} from 'react-router-dom'
import '../css/default.css'
import '../css/main.css'
import '../css/qna.css'
import '../css/animation.css'
import '../css/result.css'
import qnaList from '../data/newQuestion.js'
import infoList from '../data/newAnswer.js'
import studyList from '../data/newStudy.js'


const endPoint = 12;
const select = [0,0,0,0,0,0,0];
const subject = [0,0,0,0,0,0,0,0,0,0,0];


const cal = (num) => {
  let result = 0;
  if(num===1){
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
  let imgURL = `${process.env.PUBLIC_URL}/img_new/image-${point}.png`;
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
    for(let i=0; i<children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s"
      children[i].style.animation = "fadeOut 0.5s"
    }
    setTimeout(() => {
      let target = qnaList[qID].a[index].type;
      for(let i=0; i<target.length; i++){
        if(target[i]==='6'){
          let value = qnaList[qID].a[index].diff;
          for(let j=0; j<value.length; j++){
            subject[value[j]] += 1
          }
        } else {
          select[target[i]] += 1
        }
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
          <img id="logo" src={process.env.PUBLIC_URL + './img_new/logo.png'} alt="logoImage" className="img-fluid" />
        </div>
        <p id="intro">
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
        <Link to="/result">
          <button type="button" className="goBack mt-3 px-3 py-2">사이트로 돌아가기</button>
        </Link>
        
      </section>
    </div>
  );
};
export default Home;
