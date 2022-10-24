import { useRouter } from "next/router";
import Link from "next/link";

export default function BoardFunction({ boards }) {
	console.log(boards);
	return (
		<ul>
			{boards &&
				boards.map((ele) => (
					<Link href={`/board/${ele.categoryKey}/${ele.postKey}`}>
						<a>
							<li key={ele.postKey}>{ele.title}</li>
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
