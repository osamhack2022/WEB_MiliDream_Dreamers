import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/router";
import { GlobalState } from "../../../../states/GlobalState";
import('react-quill');
//import ReactQuill from "react-quill";
import BoardUser from "../../../../components/board/BoardUser";
import BoardSearchBar from "../../../../components/board/BoardSearchBar";
import BoardNavBar from "../../../../components/board/BoardNavBar";
import BoardCenter from "../../../../components/board/BoardCenter";
import BoardHeader from "../../../../components/board/BoardHeader";


export default function Write() {
	const [text, setText] = useState('');
	const quillRef = useRef();
	const router = useRouter();
	const user = GlobalState(state => state.user);

	/** 로그아웃된 상태에서는 /board로 리다이렉트 */
	useEffect(() => {
		if (!user) {
			router.push("/board");
			alert("로그인한 상태에서만 글을 쓸 수 있습니다.")
		}
	}, [user]);

	const imageHandler = () => {
		//if (typeof window !== 'undefined') {
		const input = document.createElement('input');

		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.addEventListener('change', async (ev) => {
			const file = input.files[0];
			const formData = new FormData();
			formData.append('img', file);
			try {
				const result = await axios.post('/api/image/upload', formData);
				const url = '/api' + result.data.path;
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, 'image', url);
			} catch (ex) { console.error(ex); }
		});
		//}
		return;
	}

	const formats = [ /** @todo 추가시 백엔드 post 받는 부분에도 허용 테그 추가해야함 */
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'image',
	];
	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					['image'],
					[{ header: [1, 2, 3, false] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
				],
				handlers: {
					image: imageHandler,
				},
			},
		}
	});
	const handleText = (content, d, s, editor) => {
		//console.log(content);
	}

	/** 게시글 등록 버튼 누르면 작동함 */
	const onSubmitClick = async () => {
		const response = await fetch("/api/board", {
			method: "POST",
			body: JSON.stringify
				({
					categoryKey: router.query["board-id"],
					title: document.querySelector("#titleInput").value,
					body: quillRef.current.value,
				}),
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await response.json();
		//console.log(data);
		if (response.ok) {
			router.push(`/board/${router.query["board-id"]}/${data.postKey.postKey}`)
		} else {
			console.log("err,", data);
		}
	}


	const boardId = router.query["board-id"];
	const [article, setArticle] = useState();
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/board/category`, { method: 'GET' })).json();
			setArticle(results.category);
		})();
	}, []);
	const articlePost = article && article.slice(0).find((x) => x.categoryKey == boardId)

	const QuillWrapper = dynamic(
		async () => {
			const { default: RQ } = await import('react-quill');
			return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
		}, {
		ssr: false,
		loading: () => <p>Loading...</p>
	});

	return (
		<div>
			<div className="container">
				<div className="headerB">
					<BoardHeader boardId={articlePost?.categoryName} />
				</div>
				<div className="userInfo">
					<BoardUser />
				</div>
				<div className="navBar">
					<BoardSearchBar placeHolder="게시판 검색" />
					<BoardNavBar props={article} />
				</div>
				<div className="banner">
					<BoardCenter />
				</div>
				<div className="BoardMain">
					<div className="editorBox">
						<input type="text" name="title" id="titleInput" placeholder="제목을 입력해 주세요"></input>
						<QuillWrapper
							forwardedRef={quillRef}
							theme="snow"
							modules={modules}
							formats={formats}
							onChange={handleText} />
						<button className="btn btn-secondary" onClick={onSubmitClick}>작성 완료!</button>
					</div>
				</div>
				<div className="footer"></div>
			</div>
			<style jsx>{`
				.btn-secondary {
					background-color: #a593e0;
					border-color: #a593e0;
				}
				.editorBox {
					width: 1000px;
				}
				.editorBox > input {
					margin-bottom: 20px;
					width: 1000px;
				}
				.editorBox > button {
					width: 1000px;
					margin-top: 20px;
				}
          .container {
            display:  grid;
            grid-template-areas:
            "userInfo header header"
            "userInfo banner banner"
            "navBar   banner banner"
            "navBar   miniB  miniB"
            "navBar   miniB  miniB"
            "navBar   miniB  miniB";
            grid-gap: 16px;
            }
            .headerB { grid-area: header; }
            .banner { grid-area: banner; }
            .userInfo { grid-area: userInfo; }
            .navBar { grid-area: navBar; }
            .BoardMain {
              grid-area: miniB;
              //display: contents;
			  display: flex;
            }
            .footer { grid-area: footer; }
            `}</style>
		</div>
	)
}





/*참고용 템플릿 
https://codesandbox.io/s/luctk?file=/src/components/App.jsx
https://constructionsite.tistory.com/44
*/