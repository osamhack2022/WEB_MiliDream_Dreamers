import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BoardFunction() {

	const router = useRouter();
	const [boards, setBoards] = useState([])

	useEffect(() => {
		if (router.isReady) {
			(async () => {
				const { content } = router.query;
				const response = await fetch(
					`/api/board/query?content=${content}`
				);
				if (response.ok) {
					const data = await response.json();
					const { boards } = data;
					console.log(boards);
					setBoards(boards);
				} else {
					const err = await response.text();
					console.log("err", err);
				}
			})();

		}
	}, [router.isReady, router.query?.content]);

	return (
		<ul>
			{boards &&
				boards.map((ele) => (
					<Link key={ele.postKey} href={`/board/${ele.categoryKey}/${ele.postKey}`}>
						<a>
							<li>{ele.title}</li>
						</a>
					</Link>
				))}
		</ul>
	);
}

// export async function getServerSideProps({ query }) {
// 	const { content } = query;

// 	console.log(content);
// 	const response = await fetch(
// 		`http://localhost:3000/api/board/query?content=${content}`
// 	);
// 	if (response.ok) {
// 		const data = await response.json();

// 		const { boards } = data;
// 		console.log(boards);
// 		return {
// 			props: { boards },
// 		};
// 	} else {
// 		const err = await response.json();
// 		console.log("err", err);
// 	}
// 	return {
// 		props: {},
// 	};
// }
