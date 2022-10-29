import Image from "next/image";

export default function Footer({ bottomPx }) {
	return (
		<footer className="footer">
			<div
				style={{
					position: "absolute",
					top: "3000px",
					width: "100%",
					backgroundColor: "#566270",
					height: "96px",
				}}
			>
				<Image
					width="1920px"
					height="96px"
					src="/img/Footer/Footer(Simply).svg"
					style={{
						backgroundColor: "#566270",
					}}
				/>
				{/* <a>
						<br /> Copyrightⓒ 2022, Dreamers. All right reserved
				</a> */}
			</div>
			<style jsx>{`
				div {
					text-align: center;
					justify-content: center;
				}
				a {
					font-size: 13px;
					color: #ffffff;
				}
				Image {
					border: 0;
				}
			`}</style>
		</footer>
	)
}
