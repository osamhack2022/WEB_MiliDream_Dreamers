import React, { Component } from "react";
import { css } from "styled-components";

const style = css`
@keyframes r {
    0% {
        transform: rotate(360deg)
    }
}
@keyframes g {
}

body {
    background-color: #fff;
    color: #000
}

.container_bar {
    max-width: 1300px;
    width: 130%
}

.progressbar-container {
    position: absolute;
    width: 1200px;
    text-align: center;
    margin-left: 40px;
    height: 50px;
    border: 3px solid #000;
    border-radius: 30px;
    border-color: #a7a7a7;
    display: block;
    align-items: center;
    justify-content: center;
    overflow: hidden
}

.progressbar-complete {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #fba58c;
    border-radius: 10px;
    animation: g 2500ms infinite ease-in-out;
    z-index: 2
}

.progressbar-liquid {
    z-index: 3;
    width: 60px;
    height: 70px;
    animation: g 2500ms infinite ease-in-out,r 3000ms infinite cubic-bezier(.5,.5,.5,.5);
    position: absolute;
    right: -5px;
    top: -10px;
    background-color: #fba58c;
    border-radius: 40%
}
`;


export default function ProgressBar() {
	let percent = 0;
	return (
		<div className="container_bar">
			{/*<h1 style={{ textAlign: "center" }}>Year progress</h1>*/}
			<div
				className="progressbar-container"
				style={{ boxShadow: "1px 3px 4px 2px #BEBEBE" }}
			>
				<div
					className="progressbar-complete"
					style={{ width: `${percent}%` }}
				>
					<div className="progressbar-liquid"></div>
				</div>

				<span
					className="progress"
					style={{
						display: "inline-block",
						position: "absolute",
						height: "30px",
						marginTop: "10px",
						zIndex: "100",
						textAlign: "center",
						color: "#000000",
						fontSize: "17px",
						fontWeight: "Bold",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "transparent",
					}}
				>
					{percent}%
				</span>
				<style jsx>{style}</style>
			</div>
		</div>
	);
}


