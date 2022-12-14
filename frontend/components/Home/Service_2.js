import { Component } from "react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
import Image from "next/image";
import Link from "next/link";

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
					<Image width="296px" height="319px" className="career_service" src="/img/home/community.svg" />
				</div>
				<div className="ServiceContainer">
					<div className='nowrap-content'>
						<div className="item">
							<Link href="/user">
								<Image
									width="345px"
									height="160px"
									className="serviceButton_4"
									src="/img/home/serviceButton_4.png"
								/>
							</Link>
						</div>
						<div className="item">
							<Link href="/board">
								<Image
									width="345px"
									height="160px"
									className="serviceButton_5"
									src="/img/home/serviceButton_5.png"
								/>
							</Link>
						</div>
					</div>
					<div className='nowrap-content'>
						<div className="item">
							<Link href="/board">
								<Image
									width="345px"
									height="160px"
									className="serviceButton_6"
									src="/img/home/serviceButton_6.png"
								/>
							</Link>
						</div>
						<div className="item" style={{ cursor: "default" }}>
							<Image
								width="345px"
								height="160px"
								className="serviceButton_none"
								src="/img/home/serviceButton_none.png"
							/>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
	  	.nowrap-content {
			display: flex;
			flex-wrap: nowrap;
		}
        .container_2 {
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
          background-color: #ffffff;
          display: flex;
          border: 4px solid;
          border-color: #c8f1ff;
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
