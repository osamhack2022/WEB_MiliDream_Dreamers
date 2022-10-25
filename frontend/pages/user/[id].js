import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import ProgressBar from "../../components/user/Progress_bar";

const now = new Date().getTime();

export default function user_id() {
	const routerId = useRouter().query["id"];
	const [userInfo, setUserInfo] = useState({});
	const [start_year, set_start_year] = useState("0000");
	const [start_month, set_start_month] = useState("00");
	const [start_date, set_start_date] = useState("00");
	const [goal_year, set_goal_year] = useState("0000");
	const [goal_month, set_goal_month] = useState("00");
	const [goal_date, set_goal_date] = useState("00");

	useEffect(() => {
		(async () => {
			try { setUserInfo(await (await fetch(routerId ? `/api/user/${routerId}` : "/api/user")).json()); } catch { }
		})();
	}, []);
	useEffect(() => {
		let getProgress = (startstr) => {
			const now = new Date().getTime();
			const startTime = new Date(startstr).getTime();
			const goalTime = startTime + 547 * (1000 * 60 * 60 * 24);
			const start = new Date(startstr);
			const goal = new Date(goalTime);
			set_start_year(start.getFullYear());
			set_start_month(start.getMonth() + 1);
			set_start_date(start.getDate());
			set_goal_year(goal.getFullYear());
			set_goal_month(goal.getMonth() + 1);
			set_goal_date(goal.getDate());
			return Math.round(((now - startTime) / (goalTime - startTime)) * 100);
		}
		const progress = getProgress(userInfo.enlistment);
		document.querySelector(".progressbar-complete").style.width = `${progress}%`;
		document.querySelector(".progress").innerText = `${progress}%`;
	}, [userInfo]);


	return (
		<div
			style={
				{
					// position: "absolute",
					//top: "100px",
					//left: "90px",
				}
			}
		>
			{/* <h1>[id]에 따른 각 유저 정보/프로필 페이지</h1> */}
			<div>
				<h1
					style={{
						marginLeft: "150px",
						// marginTop: "20px",
						marginBottom: "10px",
						fontSize: "34px",
						fontWeight: "550",
					}}
				>
					유저 프로필 및 정보
				</h1>
				<h3
					style={{
						marginLeft: "150px",
						marginBottom: "30px",
						fontWeight: "600px",
						fontSize: "20px",
					}}
				>
					내 프로필 및 나에 대한 정보를 보거나 관리하는 페이지입니다.
				</h3>
			</div>

			{/*1번째 form*/}
			<div>
				<form
					style={{
						display: "flex",
						width: "1300px",
						margin: "0 auto",
						// marginLeft: "auto",
						// marginRight: "auto",
						border: "1px solid #ddd",
						borderRadius: "30px",
						padding: "30px",
						alignItems: "center",
						WebkitJustifyContent: "centor",
						boxShadow: "1px 3px 5px 2px #BEBEBE",
					}}
				>
					<div
						className="container"
						style={{
							display: "flex",
							marginLeft: "auto",
							marginRight: "auto",
						}}
					>
						<div
							className="item_A"
							style={{
								display: "flex",
								width: "150px",
								marginLeft: "30px",
								marginRight: "120px",
							}}
						>
							<img src="/img/user/profile_none.svg"></img>
						</div>
						<div
							className="item_B"
							style={{
								fontSize: "25px",
								flex: "1",
								marginTop: "25px",
							}}
						>
							<div style={{ fontWeight: "550" }}>{userInfo.userName}[{userInfo.userId}]</div>
							<div className="wordbox">
								<div
									className="word"
									style={{
										display: "inline-block",
										width: "900px",
										whiteSpace: "nowrap",
										fontSize: "20px",
										fontWeight: "520",

										//줄 기준으로 자르기 style
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "normal",
										lineHeight: "1.2",
										height: "4.8em",
									}}
								>
									<br />
									{userInfo.introduce === null ? "소개를 입력해주세요." : userInfo.introduce}
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>

			{/*2번째 form*/}
			<div>
				<form
					style={{
						marginTop: "50px",
						display: "flex",
						width: "1300px",
						//margin: "0 auto",
						marginLeft: "auto",
						marginRight: "auto",
						border: "1px solid #ddd",
						borderRadius: "30px",
						padding: "30px",
						alignItems: "center",
						WebkitJustifyContent: "centor",
						boxShadow: "1px 3px 5px 2px #BEBEBE",
					}}
				>
					<div className="container_2_1" style={{ display: "flex" }}>
						<div
							className="item_B"
							style={{
								flex: "1",
							}}
						>
							<h2
								style={{
									fontSize: "28px",
									marginTop: "0px",
									marginLeft: "10px",
									marginBottom: "20px",
									fontWeight: "bold",
								}}
							>
								기본 정보
							</h2>
							<div className="wordbox">
								<div
									className="word"
									style={{
										display: "inline-block",
										width: "900px",
										whiteSpace: "nowrap",
										fontSize: "20px",
										fontWeight: "520",
										overflow: "hidden",
										textOverflow: "ellipsis",
										//줄 기준으로 자르기 style
										whiteSpace: "normal",
										lineHeight: "1.2",
										height: "4.8em",
									}}
								>
									<div
										style={{
											marginTop: "0px",
											marginLeft: "30px",
										}}
									>
										<div style={{ marginBottom: "-15px" }}>
											<span
												style={{
													color: "#A7A7A7",
													fontSize: "20px",
													fontWeight: "500",
												}}
											>
												계급 |&nbsp;
											</span>
											<span
												style={{
													fontSize: "20px",
													fontWeight: "500",
												}}
											>
												<span style={{ fontWeight: "600" }}>{
													userInfo.enlistment ? (
														getRank(userInfo.enlistment)
													) : "복무일수를 입력해주세요"
												}</span>

												{/* <select
                          className="choice"
                          style={{
                            width: "124px",
                            height: "32px",
                            border: "0px",
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          &nbsp;
                          <optgroup label="이등병">
                            <option>이병 1호봉</option>
                            <option>이병 2호봉</option>
                            <option>이병 3호봉</option>
                          </optgroup>
                          <optgroup label="일등병">
                            <option>일병 1호봉</option>
                            <option>일병 2호봉</option>
                            <option>일병 3호봉</option>
                            <option>일병 4호봉</option>
                            <option>일병 5호봉</option>
                            <option>일병 6호봉</option>
                            <option>일병 7호봉</option>
                            <option>일병 8호봉</option>
                          </optgroup>
                          <optgroup label="상등병">
                            <option>상병 1호봉</option>
                            <option>상병 2호봉</option>
                            <option>상병 3호봉</option>
                            <option>상병 4호봉</option>
                            <option>상병 5호봉</option>
                            <option>상병 6호봉</option>
                            <option>상병 7호봉</option>
                          </optgroup>
                          <optgroup label="병장">
                            <option>병장 1호봉</option>
                            <option>병장 2호봉</option>
                            <option>병장 3호봉</option>
                            <option>병장 4호봉</option>
                            <option>병장 5호봉</option>
                            <option>병장 6호봉</option>
                            <option>병장 7호봉</option>
                          </optgroup>
                        </select> */}
												&nbsp;
												(D-
												{calculateDDay(new Date(userInfo.enlistment))}
												)
											</span>
										</div>
										<br></br>
										<span
											style={{
												color: "#A7A7A7",
												fontSize: "20px",
												fontWeight: "500",
											}}
										>
											복무지 |&nbsp;
										</span>&nbsp;
										<span
											style={{
												fontSize: "20px",
												fontWeight: "500",
											}}
										>
											국군지휘통신사령부 57정보통신대대 본부중대&nbsp;
										</span>
									</div>
								</div>
								<div>
									<ProgressBar />
								</div>

								{/*progressBar 입대날짜, 전역날짜*/}
								<div
									className="startDate"
									style={{
										position: "absolute",
										display: "inline-block",
										color: "#A7A7A7",
										fontSize: "16px",
										fontWeight: "400px",

										marginTop: "70px",
										marginLeft: "25px",
										textShadow: "0px 4px 4px #A7A7A7",
									}}
								>
									{`${start_year}.${start_month >= 10 ? start_month : "0" + start_month
										}.${start_date >= 10 ? start_date : "0" + start_date}`}
									<br />
									입대
								</div>
								<div
									className="goalDate"
									style={{
										position: "absolute",
										display: "inline-block",
										color: "#A7A7A7",
										fontSize: "16px",
										fontWeight: "400px",
										marginTop: "70px",
										marginLeft: "1140px",
										textShadow: "0px 4px 4px #A7A7A7",
									}}
								>
									{`${goal_year}.${goal_month >= 10 ? goal_month : "0" + goal_month
										}.${goal_date >= 10 ? goal_date : "0" + goal_date}`}
									<br />
									<div
										style={{
											marginTop: "4px",
										}}
									>
										&emsp;&emsp;&emsp;전역
									</div>
								</div>
								<div>
									<br></br>
									<hr
										style={{
											border: "0",
											width: "1300px",
											backgroundColor: "#EBE9E8",
											height: "3px",

											//이거만 건들면 되겠다~ bar는.
											marginLeft: "0px",
											marginTop: "140px",
										}}
									/>
								</div>

								<h2
									style={{
										fontSize: "28px",
										marginTop: "30px",
										marginLeft: "10px",
										marginBottom: "20px",
										fontWeight: "bold",
									}}
								>
									진로 관련 정보
								</h2>
								<div
									style={{
										marginTop: "0px",
										marginLeft: "30px",
									}}
								>
									<div style={{ marginBottom: "-15px" }}>
										<span
											style={{
												color: "#A7A7A7",
												fontSize: "20px",
												fontWeight: "500",
											}}
										>
											진로 유형 |&nbsp;
										</span>
										<span
											style={{
												fontSize: "20px",
												fontWeight: "500",
											}}
										>
											{"자기계발"}형
										</span>
										<a
											href="http://www.naver.com"
											target={"_blank"}
											style={{
												fontSize: "18px",
												marginLeft: "30px",
												color: "#A593E0",
												cursor: "pointer",
												textDecoration: "underline",
												textUnderlinePosition: "under",
											}}
										>
											더 알아보기{">"}
										</a>
									</div>
									<br></br>
									<span
										style={{
											color: "#A7A7A7",
											fontSize: "20px",
											fontWeight: "500",
										}}
									>
										설정한 목표 |&nbsp;
									</span>&nbsp;
									<div className="wrapper">
										{/** 1번 목표 */}
										<div className="bigger">
											<img
												className="plan_state"
												src="/img/user/onGoing.svg"
												onClick={() => { }}
												style={{
													filter: "drop-shadow(5px 5px 5px #A7A7A7)",
												}}
											/>
											<div
												style={{
													display: "inline-block",
													fontSize: "20px",
													fontWeight: "Bold",
													marginLeft: "16px",
													marginTop: "14px",
												}}
											>
												목표 타이틀
											</div>
											<div
												style={{
													fontSize: "16px",
													marginLeft: "28px",
													marginRight: "28px",
													marginTop: "6px",

													//줄 바꿈
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "normal",
													lineHeight: "1.2",
													height: "1.2em",
												}}
											>
												목표에 대한 간단한 소개가 적혀있는 곳입니다.
												안녕하세요안녕하세요안녕하세
											</div>
											<div
												style={{
													marginLeft: "28px",
													marginTop: "3px",
												}}
											>
												<img
													style={{
														display: "inline",
														width: "16px",
													}}
													src="/img/user/clock.svg"
												/>
												&nbsp;&nbsp;
												<div
													style={{
														display: "inline-block",
														color: "#A7A7A7",
													}}
												>
													{/*날짜.. */}
													yyyy.mm.dd ~ yyyy.mm.dd
													{/* 날짜 받아오면 활용{`${goal_year}.${
                            goal_month >= 10 ? goal_month : "0" + goal_month
                          }.${
                            goal_date >= 10 ? goal_date : "0" + goal_date
                          }`}&nbsp;
                          ~
                          {`${goal_year}.${
                            goal_month >= 10 ? goal_month : "0" + goal_month
                          }.${goal_date >= 10 ? goal_date : "0" + goal_date}`} */}
													{/* 만약 선택해야되면 활용
						  <p><input type={"date"} /></p>
							*/}
												</div>
											</div>
										</div>

										{/* 2번 목표 */}
										<div className="bigger">
											<img
												className="plan_state"
												src="/img/user/complete.svg"
												onClick={() => { }}
											/>
											<div
												style={{
													display: "inline-block",
													fontSize: "20px",
													fontWeight: "Bold",
													marginLeft: "16px",
													marginTop: "14px",
												}}
											>
												목표 타이틀
											</div>
											<div
												style={{
													fontSize: "16px",
													marginLeft: "28px",
													marginRight: "28px",
													marginTop: "6px",

													//줄 바꿈
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "normal",
													lineHeight: "1.2",
													height: "1.2em",
												}}
											>
												목표에 대한 간단한 소개가 적혀있는 곳입니다.
												안녕하세요안녕하세요안녕하세
											</div>
											<div
												style={{
													marginLeft: "28px",
													marginTop: "3px",
												}}
											>
												<img
													style={{
														display: "inline",
														width: "16px",
													}}
													src="/img/user/clock.svg"
												/>
												&nbsp;&nbsp;
												<div
													style={{
														display: "inline-block",
														color: "#A7A7A7",
													}}
												>
													{/*날짜.. */}
													yyyy.mm.dd ~ yyyy.mm.dd
												</div>
											</div>
										</div>
										{/* 3번 목표 */}
										<div className="bigger">
											<img
												className="plan_state"
												src="/img/user/onGoing.svg"
												onClick={() => { }}
											/>
											<div
												style={{
													display: "inline-block",
													fontSize: "20px",
													fontWeight: "Bold",
													marginLeft: "16px",
													marginTop: "14px",
												}}
											>
												목표 타이틀
											</div>
											<div
												style={{
													fontSize: "16px",
													marginLeft: "28px",
													marginRight: "28px",
													marginTop: "6px",

													//줄 바꿈
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "normal",
													lineHeight: "1.2",
													height: "1.2em",
												}}
											>
												목표에 대한 간단한 소개가 적혀있는 곳입니다.
												안녕하세요안녕하세요안녕하세
											</div>
											<div
												style={{
													marginLeft: "28px",
													marginTop: "3px",
												}}
											>
												<img
													style={{
														display: "inline",
														width: "16px",
													}}
													src="/img/user/clock.svg"
												/>
												&nbsp;&nbsp;
												<div
													style={{
														display: "inline-block",
														color: "#A7A7A7",
													}}
												>
													{/*날짜.. */}
													yyyy.mm.dd ~ yyyy.mm.dd
												</div>
											</div>
										</div>
										{/* 4번 목표 */}
										<div className="bigger">
											<img
												className="plan_state"
												src="/img/user/beforeOnGoing.svg"
												onClick={() => { }}
											/>
											<div
												style={{
													display: "inline-block",
													fontSize: "20px",
													fontWeight: "Bold",
													marginLeft: "16px",
													marginTop: "14px",
												}}
											>
												목표 타이틀
											</div>
											<div
												style={{
													fontSize: "16px",
													marginLeft: "28px",
													marginRight: "28px",
													marginTop: "6px",

													//줄 바꿈
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "normal",
													lineHeight: "1.2",
													height: "1.2em",
												}}
											>
												목표에 대한 간단한 소개가 적혀있는 곳입니다.
												안녕하세요안녕하세요안녕하세
											</div>
											<div
												style={{
													marginLeft: "28px",
													marginTop: "3px",
												}}
											>
												<img
													style={{
														display: "inline",
														width: "16px",
													}}
													src="/img/user/clock.svg"
												/>
												&nbsp;&nbsp;
												<div
													style={{
														display: "inline-block",
														color: "#A7A7A7",
													}}
												>
													{/*날짜.. */}
													yyyy.mm.dd ~ yyyy.mm.dd
												</div>
											</div>
										</div>
									</div>
									<style jsx>{`
                    .bigger {
                      transition: 0.5s;
                      cursor: pointer;
                    }
                    .bigger:hover {
                      transform: scale(1.007);
                    }
                    .plan_state {
                      display: inline-block;
                      margin-left: 26px;
                      margin-bottom: 4px;
                    }
                    option {
                    }
                    .wrapper > div {
                      //background-color: orange;
                      border: 2px #a7a7a7 solid;
                      border-radius: 20px;
                    }

                    .wrapper > div:nth-child(odd) {
                      //background-color: indianred;
                    }

                    .wrapper {
                      margin-top: 20px;
                      margin-left: 10px;
                      display: grid;
                      grid-template-columns: 570px 570px;
                      grid-template-rows: 120px 120px;
                      grid-column-gap: 20px;
                      grid-row-gap: 20px;
                    }
                  `}</style>
								</div>
							</div>
						</div>
					</div>
				</form>
				<form></form>
			</div>
		</div>
	);
}

function calculateDDay(date) {
	// TODO: 복무형태별 복무일수
	const DUTYDATES = {
		"육군": 547,
		"공군": 638,
		"해군": 608,
		"해병대": 547,
	}
	const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
	return DUTYDATES["육군"] - diff;
}

function getRank(date) {
	// TODO: 달 수 차이만 고려해서 구현했음
	// TODO: 복무형태별은 고려안함
	const today = new Date();
	const enlist = new Date(date);
	const diff = (today.getFullYear() - enlist.getFullYear()) * 12 + today.getMonth() - enlist.getMonth() + 1;
	if (diff <= 3) return `이병 ${diff}호봉`;
	else if (diff <= 9) return `일병 ${diff - 3}호봉`;
	else if (diff <= 15) return `상병 ${diff - 9}호봉`;
	else if (diff <= 18) return `병장 ${diff - 15}호봉`;

	return "민간인";
}