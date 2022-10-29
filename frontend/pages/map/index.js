//홈, GNB 에서 :진로설계 눌렀을 때 나오는 페이지
import Link from "next/link";
import Image from "next/image";

export default function Career() {
	return (
		<div className="container">
			<div className="img-background">
				<Image width="1920px" height="765px" src={`/career/0. 배경.png`} />
			</div>
			<div className="position-absol">
				<div className="big-title-flex">
					<div className="big-title">
						<Image width="1200px" height="353px" src={`/career/1. 진로 유형 분석하기.png`} />
					</div>
					<div className="mini-title">
						<div className="one">
							<Link href="/career/survey">
								<Image width="550px" height="183px" src={`/career/1-1. 진로 유형 검사.png`} />
							</Link>
						</div>
						<div className="two">
							<Link href="/career/survey">
								<Image width="550px" height="183px" src={`/career/1-2. 검사 결과 확인하기.png`} />
							</Link>
						</div>
					</div>
				</div>
				<div className="big-title-flex">
					<div className="big-title">
						<Image width="1200px" height="353px" src={`/career/2. 자신만의 진로 설계하기.png`} />
					</div>
					<div className="mini-title">
						<div className="one">
							<Link href="/career/survey">
								<Image width="550px" height="183px" src={`/career/2-1. 진로 설계하기.png`} />
							</Link>
						</div>
						<div className="two">
							<Link href="/career/contest">
								<Image width="550px" height="183px" src={`/career/2-2.공모전 및 대회 정보.png`} />
							</Link>
						</div>
					</div>
				</div>
				<div className="big-title-flex">
					<div className="big-title">
						<Image width="1200px" height="353px" src={`/career/3. 진로 계획 공유하기.png`} />
					</div>
					<div className="mini-title">
						<div className="one">
							<Link href="/board">
								<Image width="550px" height="183px" src={`/career/3-1. 커뮤니티.png`} />
							</Link>
						</div>
						<div className="two">
							<Link href="/board">
								<Image width="550px" height="183px" src={`/career/3-2. 진로 계획 공유하기.png`} />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<style global jsx>{`
				.container {
					margin: 0px;
					padding: 0px;
				}
				.img-background {
					width: 1920px;
					height: 765px;
					z-index: -1;
					position: absolute;
					justify-content: center;
				}
				.position-absol {
					position: absolute;
					top: 430px;
					height: 1400px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
				}
				.big-title-flex {
					width: 1920px;
					//height: 765px;
					display: flex;
					justify-content: center;
				}
				.big-title {
					//position: absolute;
					//z-index: 0;
				}
				.mini-title {
					display: flex;
					justify-content: space-between;
					align-content: center;
					width: 1128px;
					height: 183px;
					position: absolute;
					z-index: 3;
					margin-top: 139px;
				}
				.one { cursor: pointer; }
				.two { cursor: pointer; }
				{/* //추후 마우스 대면 커지는 효과도 */}
			`}</style>
		</div>
	)
}