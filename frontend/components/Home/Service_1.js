import { Component } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

export default function Service_1() {
  return (
    <div className="flex-container">
      <div
        className="container_1"
        style={{
          position: "absolute",
          top: "1800px",
        }}
      >
        <div className="serviceImg_1">
          <img className="career_service" src="/img/home/career_service.svg" />
        </div>
        <div className="ServiceContainer">
          <div className="item">
            <img
              className="serviceButton_1"
              src="/img/home/serviceButton_1.svg"
            />
          </div>
          <div className="item">
            <img
              className="serviceButton_2"
              src="/img/home/serviceButton_2.svg"
            />
          </div>
          <div className="item">
            <img
              className="serviceButton_3"
              src="/img/home/serviceButton_3.svg"
            />
          </div>
          <div className="item" style={{ cursor: "default" }}>
            <img
              className="serviceButton_none"
              src="/img/home/serviceButton_none.svg"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container_1 {
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          // background-color: tomato;
          text-align: center;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .ServiceContainer {
          width: 691px;
          display: flex;
          border: 4px solid;
          border-color: #b7a9e6;
          padding: 0px;
        }
        .item {
          background-color: #e4e7df;
          text-align: center;
          font-size: 30px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          cursor: pointer;
        }

        .serviceImg_1 {
          display: flex;
          height: 100px;
          text-align: center;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 350px;
          margin-right: 150px;
          text-align: center;
          font-size: 30px;
          // padding: 0px 80px;
        }
        div {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
