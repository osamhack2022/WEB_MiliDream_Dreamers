import Head from "next/head";

export default function Seo({ title }) {
	let titleArray = { '/': '메인', '/map': '진로 설계', '/board': '게시판', '/career/contest': '공모전', '/career/survey': '유형 검사', '/signup': '회원가입', '/user': '프로필', '/board/search': '게시판 검색 결과' };
	//console.log(title.indexOf('/', 1));
	//console.log(titleArray[title])
	let tabTitle = titleArray[title];
	if (titleArray[title] === undefined) {
		tabTitle = titleArray[title.substr(0, title.indexOf('/', 1))]
	}

	return (
		<Head>
			<title>{`MILI-Dream | ${tabTitle}`}</title>
		</Head>
	)
}