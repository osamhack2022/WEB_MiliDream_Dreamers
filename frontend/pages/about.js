import Image from "next/image";

export default function about() {
	return (
		<div>

			<h1>THIS IS about page</h1>
			<Image
				src={(process.env.NODE_ENV === 'production' ? "/WEB_MiliDream_Dreamers" : "") + "/vercel.svg"}
				width="50px"
				height="50px" />
			<img src={(process.env.NODE_ENV === 'production' ? "/WEB_MiliDream_Dreamers" : "") + "/vercel.svg"} />

			<div className="abc"></div>

			<style jsx global>{`
            `}</style>
			<style jsx>{`
                h1 {
                    background-color: tomato;
                }
                .abc {
                    color: blue;
                }
            `}</style>
		</div>
	)
}