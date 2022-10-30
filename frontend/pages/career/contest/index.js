import Link from "next/link";
import Image from "next/image";

export default function Contact() {
	return (
		<div className="container">
			<div className="searchBar">
				<Image width="1297px" height="296px" src={`/contest/list-searchBar.png`} />
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
				}
			`}</style>
		</div>
	);
}
