import { Component } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import Image from "next/image";

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
					<Image width="296px" height="319px" className="career_service" src="/img/home/career_service.svg" />
				</div>
				<div className="ServiceContainer">
					<div className='nowrap-content'>
						<div className="item">
							<Image
								width="345px"
								height="160px"
								className="serviceButton_1"
								src="/img/home/serviceButton_1.svg"
							/>
						</div>
						<div className="item">
							<Image
								width="345px"
								height="160px"
								className="serviceButton_2"
								src="/img/home/serviceButton_2.svg"
							/>
						</div>
					</div>
					<div className="item">
						<Image
							width="345px"
							height="160px"
							className="serviceButton_3"
							src="/img/home/serviceButton_3.svg"
						/>
					</div>
					<div className="item" style={{ cursor: "default" }}>
						<Image
							width="345px"
							height="160px"
							className="serviceButton_none"
							src="/img/home/serviceButton_none.svg"
						/>
					</div>
				</div>
			</div>
			<style jsx>{`
				.nowrap-content {
					display: flex;
					flex-wrap: nowrap;
				}
        .container_1 {
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          text-align: center;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .ServiceContainer {
          width: 698px;
          background-color: #e4e7df;
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
          transition: 0.3s;

          cursor: pointer;
          padding: 0px;
        }
        .item:hover {
          transform: scale(1.007);
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
