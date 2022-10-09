import Link from "next/link";
import { Component } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

export default function Service_2() {
  return (
    <div className="flex-container">
      <div
        className="container_2"
        style={{
          position: "absolute",
          top: "1800px",
        }}
      >
        <div className="serviceImg_2">
          <img className="community" src="/img/home/community.svg" />
        </div>
        <div className="ServiceContainer">
          <div className="item">
            <img
              className="serviceButton_4"
              src="/img/home/serviceButton_4.svg"
            />
          </div>
          <div className="item">
            <img
              className="serviceButton_5"
              src="/img/home/serviceButton_5.svg"
            />
          </div>
          <Link href="/board">
            <div className="item">
              <img
                className="serviceButton_6"
                src="/img/home/serviceButton_6.svg"
              />
            </div>
          </Link>
          <div className="item" style={{ cursor: "default" }}>
            <img
              className="serviceButton_none"
              src="/img/home/serviceButton_none.svg"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container_2 {
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          //background-color: tomato;
          text-align: center;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .ServiceContainer {
          width: 691px;
          display: flex;
          border: 4px solid;
          border-color: #c8f1ff;
          padding: 0px;
        }
        .item {
          border: none;
          background-color: #e4e7df;
          text-align: center;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          cursor: pointer;
        }

        .serviceImg_2 {
          display: flex;
          height: 100px;
          text-align: center;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 350px;
          margin-right: 150px;
          text-align: center;
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
