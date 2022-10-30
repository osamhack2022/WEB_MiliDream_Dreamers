import Link from "next/link";
import Image from "next/image";

export default function Contact() {
	return (
		<div className="container">
			<div className="modal fade" id="TodoCoding" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">개발 중 입니다!</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<p>아직 개발 중인 기능입니다. issue를 남겨 주세요! </p>
							<p>https://github.com/osamhack2022/WEB_MiliDream_Dreamers/issues</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">확인</button>
							{/* <button type="button" className="btn btn-primary">Save changes</button> */}
						</div>
					</div>
				</div>
			</div>
			<div className="searchBar">
				<a type="button" data-bs-toggle="modal" data-bs-target="#TodoCoding">
					<Image width="1297px" height="296px" src={`/contest/list-searchBar.png`} />
				</a>
			</div>
			<div className="result">
				<Image width="1237px" height="38px" src={`/contest/searchResult.png`} />
			</div>
			<div className="list">
				<Link href={`https://whitehatcontest.com/`}>
					<Image width="1242px" height="219px" src={`/contest/WHITEHAT.png`} />
				</Link>
				<Link href={`https://maicon.kr/`}>
					<Image width="1242px" height="219px" src={`/contest/MAICON.png`} />
				</Link>
				<Link href={`https://osam.kr/`}>
					<Image width="1242px" height="219px" src={`/contest/OSAM.png`} />
				</Link>
			</div>
			<style jsx>{`
				.modal-content {
					width: 130%;
				}
				.button {
					cursor: default;;
				}
				.container {
					display: flex;
					flex-direction: column;
					align-items: center;
					align-content: center;
					height: 1500px;
					justify-content: space-evenly;
				}	
				.list {
					margin-left: 30px;
					cursor: pointer;
				}
			`}</style>
		</div>
	);
}
