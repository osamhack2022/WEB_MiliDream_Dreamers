import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, useMemo } from "react";
import { displayedAt } from "../../../../utils/strings";
import Image from "next/image";
import { GlobalState } from "../../../../states/GlobalState";
//게시글 수정 위한 quill 등
import('react-quill');
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import dynamic from "next/dynamic";

function reportModal(e) {
	e.preventDefault();
	//console.log('ggggg');
	return (
		<div className="modal fade" id="reportModalDiv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 신고</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						게시글 신고 요청이 접수되었습니다.
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" className="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function ContentRow({ comment, doReload }) {
	const user = GlobalState(state => state.user);

	/** 이 댓글의 작성자 저장 */
	const [commentUser, setCommentUser] = useState();

	/** 댓글의 수정 버튼을 누르면 수정 모드로 전환됨, 상태를 저장함 */
	const [isFixOn, setFixOn] = useState(false)

	/** 댓글 수정하는 부분 값을 얻어오기 위한 Ref */
	const commentFixTextarea = useRef();

	// 댓글을 단 사용자의 닉네임을 받아옴
	useEffect(() => {
		(async () => {
			const results = await (await fetch(`/api/user/${Number(comment?.userKey)}`, { method: 'GET' })).json();
			setCommentUser(results);
		})();
	}, [comment.userKey]);	// comment.userKey는 없을 때, 생길 때 최대 두 번 바뀜

	// 댓글 삭제 버튼을 눌렀을 때 실행
	const deleteCommentSubmit = async (e) => {
		const response = await fetch(`/api/comment/${comment.commentKey}`, {
			method: "DELETE"
		})
		if (response.ok) {
			doReload();
		} else {
			const data = await response.json();
			console.log("err", data);
		}
	}

	// 댓글 수정 버튼을 눌렀을 때, 수정 창과 수정 취소/확인 버튼을 띄울 때 사용
	const fixCommentSubmit = (e) => {
		setFixOn(true);
	}

	// 수정 취소를 누르고 다시 돌아갈 때 사용
	const fixCommentCancel = (e) => {
		setFixOn(false);
		commentFixTextarea.current.value = comment?.body;
	}

	// 수정 완료를 누르고 수정된 내용을 반영할 버튼을 누를 때 사용
	const fixCommentFin = async (e) => {
		const response = await fetch(`/api/comment/${comment.commentKey}`, {
			method: "PUT",
			body: JSON.stringify({ body: commentFixTextarea.current.value }),
			headers: { 'Content-Type': 'application/json' }
		})
		if (response.ok) {
			doReload();
			setFixOn(false)
		} else {
			const data = await response.json();
			console.log("err", data);
		}
	}

	return (
		<tr className="comment">
			<td className="content1">
				<div className="name">{commentUser?.userName}</div>
				<div className="date">{displayedAt(comment?.commentTime)}</div>
			</td>
			{/* 댓글을 단 사람이 본인일 경우 삭제, 수정 버튼 띄우기 */}
			{comment.userKey === user.userKey ? <>
				{isFixOn ?
					<td className="reWrite-box">
						<textarea defaultValue={comment?.body} ref={commentFixTextarea}></textarea>
						<button className="button cancel" onClick={fixCommentCancel}>수정 취소</button>
						<button className="button ok" onClick={fixCommentFin}>수정 완료</button>
					</td>
					:
					<>
						<td className="content2">{comment?.body}
							<div>
								<button className="button retouch" onClick={fixCommentSubmit}>수정</button>
								<button className="button delete" onClick={deleteCommentSubmit}>삭제</button>
							</div>
						</td>
					</>
				}</>
				: <td className="content2">{comment.userKey} {user.userKey} {comment?.body}</td>
			}
			<style jsx>{`
				.content2 {
					display: flex;
					justify-content: space-between;
				}
				.reWrite-box {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.reWrite-box > button {
					width: 80px;
					height: 40px;
				}
			`}</style>
		</tr>

	)
}


export default function ArticleWriteView({ post, articleId, doReload }) {

	const user = GlobalState(state => state.user);

	/** 게시글 작성자를 저장 */
	const [postUser, setPostUser] = useState();

	/** 공감 성공 시와 실패 시에 나타나는 글을 저장하는 state */
	const [recommendWord, setRecommendWord] = useState("");
	const router = useRouter();

	/** 이 게시글을 쓴 사용자 조회 */
	useEffect(() => {
		if (router.isReady && post) {
			(async () => {
				const response = await fetch(`/api/user/${Number(post?.userKey)}`, { method: 'GET' });
				const results = await (response).json();
				setPostUser(results);
			})();
		}
	}, [router.isReady, post?.userKey]);

	/** 공감을 누르면 나타나는 글을 정한다. */
	const onRecommendClick = async e => {
		const response = await fetch(`/api/board/${router.query["article-id"]}/recommend`, {
			method: "POST",
		})
		if (response.ok) {
			setRecommendWord("게시글에 공감하셨습니다!")
			doReload();
		} else {
			setRecommendWord("이미 공감한 게시글입니다!")
		}
	}

	/** 댓글을 제출하면 작동함, 제대로 작동하면 리로드하고 댓글 필드의 값 초기화 */
	const onCommentSubmit = async (e) => {
		const response = await fetch("/api/comment", {
			method: "POST",
			body: JSON.stringify({
				postKey: articleId,
				body: document.querySelector("#exampleFormControlTextarea1").value,
			}),
			headers: { 'Content-Type': 'application/json' }
		})
		if (response.ok) {
			doReload();
			document.querySelector("#exampleFormControlTextarea1").value = ""
		}
	}


	//게시글 수정 여부를 저장하는 state
	/** 게시글 수정 버튼을 누르면 수정 모드로 전환됨, 상태를 저장함 */
	const [isArticleFixOn, setArticleFixOn] = useState(false)

	/** 게시글 수정하는 부분 값을 얻어오기 위한 Ref */
	const articleFixTitleArea = useRef();
	const articleFixTextArea = useRef();

	//quill editor 관련
	const [text, setText] = useState('');
	const quillRef = useRef();
	const handleText = (content, d, s, editor) => {
		//console.log(content);
	}
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
	const QuillWrapper = dynamic(
		async () => {
			const { default: RQ } = await import('react-quill');
			return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
		}, {
		ssr: false,
		loading: () => <p>Loading...</p>
	});
	//quill 끝
	//게시글 수정 버튼 누르면.
	const onSubmitClick = async (e) => {
		const response = await fetch(`/api/board/${post?.postKey}`, {
			method: "PUT",
			body: JSON.stringify({
				title: document.querySelector("#titleInput").value,  //@todo 될지 테스트 필요
				body: quillRef.current.value,
			}),
			headers: { 'Content-Type': 'application/json' }
		})

		if (response.ok) {
			doReload(); /** @todo 만약 페이지를 새로 만들었다면 reload도 하고 페이지도 원래 페이지로 이동 */
		}
	}

	if (isArticleFixOn) {
		//console.log(isArticleFixOn);

		return (
			<div className="editorBox">
				<input type="text" name="title" id="titleInput" placeholder="제목을 입력해 주세요" defaultValue={post?.title}></input>
				<QuillWrapper
					value={post?.body}
					forwardedRef={quillRef}
					theme="snow"
					modules={modules}
					formats={formats}
					onChange={handleText} />
				<button className="btn btn-secondary" onClick={() => { onSubmitClick(); setArticleFixOn(false); }}>수정 완료!</button>
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
				`}</style>
			</div>
		)
	}
	else {
		return (
			<div>
				<div className="modal fade" id="reportModalDiv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 신고</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								게시글 신고 요청이 접수되었습니다.
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">확인</button>
								{/* <button type="button" className="btn btn-primary">Save changes</button> */}
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="recommendModalDiv" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 공감</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								{recommendWord}
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">확인</button>
								{/* <button type="button" className="btn btn-primary">Save changes</button> */}
							</div>
						</div>
					</div>
				</div>
				<div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">게시글 댓글</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								댓글 달기 완료!
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">확인</button>
								{/* <button type="button" className="btn btn-primary">Save changes</button> */}
							</div>
						</div>
					</div>
				</div>
				<div className="table-box">
					<table className="table">
						<tbody>
							<tr className="mainTitle">
								<th scope="col count" className="count titleBar">{post?.title}</th>
								<td>
									<div className="title titleBar">{postUser?.userName}</div>
									<div className="writeUser titleBar">{displayedAt(post?.postTime)}</div>
									<div className="time titleBar">조회수 {post?.viewCount}</div>
									{post?.userKey === user.userKey &&
										<div className="write-retouch-delete">
											<div className="retouch">
												<button className="button" onClick={() => { setArticleFixOn(true); }}>수정</button>
											</div>
											<div className="delete">
												<button className="button" onClick={async e => {
													const response = await fetch(`/api/board/${post?.postKey}`, { method: "DELETE" });
													if (response.ok) {
														router.push("/board")
													}
												}}>삭제</button>
											</div>
										</div>
									}<div className="comments">댓글수 [{post?.comments.length}]</div>
								</td>
							</tr>
							<tr className="mainBody">
								<th scope="col count" className="count titleBar" dangerouslySetInnerHTML={{ __html: post?.body }}></th>
								<td className="body">
									<a type="button" data-bs-toggle="modal" data-bs-target="#recommendModalDiv" onClick={onRecommendClick}>
										<p className="recommenderCount">{` ${post?.recommenderCount}`}</p>
										<Image src={`/article/recommendBtn.png`} width="131px" height="50px" />
									</a>
									<a type="button" data-bs-toggle="modal" data-bs-target="#reportModalDiv">
										<Image src={`/article/reportBtn.png`} width="131px" height="50px" />
									</a>
								</td>
								{/* <td scope="col time" className="time titleBar">익명댓글달기 버튼</td> */}
								<td className="writeComment">
									<div className="mb-3">
										{/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
										<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="댓글을 입력해 주세요"></textarea>
										<button className="button" type="button" data-bs-toggle="modal" data-bs-target="#commentModal" onClick={onCommentSubmit}>
											등록
										</button>
									</div>
								</td>
							</tr>
							{post?.comments.slice(0).map((comment) => <ContentRow key={comment.commentKey} comment={comment} doReload={doReload} />)}
						</tbody>
					</table>
				</div>
				<style global jsx>{`
				.write-retouch-delete {
					display: flex;
    				flex-direction: row;
				}
				.button {
					border: transparent;
					background: #A593E0;
					box-shadow: 0px 2px 2px rgb(0 0 0 / 25%);
					border-radius: 5px;
					cursor: pointer;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 400;
					font-size: 15px;
					line-height: 22px;
					text-align: center;
					color: #FFFFFF;
					margin-left: 10px;
					width: 60px;
				}
				.recommenderCount {
					margin: 0px;
					padding: 0px;
					position: relative;
					left: 45px;
					z-index: 5;
					top: 36px;
					color: white;
				}
				.mainTitle {
					height: 80px;		
				}
				.mainTitle > th {
					margin-left: 15px;
					height: 40px;
					display: block;
					text-align: left;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 600;
					font-size: 20px;
				}
				.mainTitle > td {
					display: flex;
					height: 40px;
				}
				.mainTitle > td > div {
					margin-left : 15px;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 400;
					font-size: 13px;
					line-height: 19px;
					color: rgba(0, 0, 0, 0.5);
				}
				.mainTitle > td > div:after {
					content: "|";
					margin-left : 15px;
				}

				//아래부터 body 내용. 위는 title
				.mainBody {
					height: max-content;
					display: flex;
					flex-direction: column;
				}
				.mainBody > th {
					min-height : 300px;
					text-align: left;
					margin-left: 15px;
					display: block;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 15px;
					line-height: 22px;
					color: #000000;
				}
				.mainBody > .body {
					
				}
				//아래는 댓글창 관련
				.mb-3 {
					display: flex;
				}
				.mb-3 > button {
					border: transparent;
					background: #A593E0;
					box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
					border-radius: 5px;
					cursor: pointer;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 400;
					font-size: 15px;
					line-height: 22px;
					text-align: center;
					color: #FFFFFF;
					margin-left: 10px;
					width: 60px;
				}
				.comment {
					display: flex;
					flex-direction: column;
				}
				.content1 {
					padding: 0px;
					display: flex;
					justify-content: space-between;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 15px;
					line-height: 22px;
					display: flex;
					align-items: center;
					color: #000000;
					margin-left: 20px;
				}
				.content1 > .date {
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 12px;
					line-height: 17px;
					align-items: center;
					color: #A7A7A7;
					margin-right: 30px;
				}
				.content2 {
					text-align: left;
					font-family: 'Noto Sans KR';
					font-style: normal;
					font-weight: 500;
					font-size: 12px;
					line-height: 17px;
					color: #000000;
					margin-left: 20px;
				}
				//아래는 table 기본 속성
				.table-box {
					border: 2px solid #A7A7A7;
					min-height: 850px;
					overflow: auto;
				}
				.table {
				--bs-table-color: black;
				--bs-table-border-color: transparent;
				width: 1000px;
				display: flex;
				flex-direction: column;
				text-align: center;
				min-height: 850px;
				margin: 0px;
				}
				.table-light {
				--bs-table-color: white;
				--bs-table-bg: transparent;
				--bs-table-border-color: transparent;
				}
				.content {
				font-family: 'Noto Sans KR';
				font-style: normal;
				font-weight: 400;
				font-size: 15px;
				line-height: 22px;
				color: black;
				}
				.gray {
				color: #A7A7A7;
				}
				tbody {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				min-height: 850px;
				}
				tr:after {
				content: "";
				display: block;
				width: 970px;
				border-bottom: 1px solid #A7A7A7;
				margin-left: 15px;
				}
				tbody > tr {
				height: 180px;
				}
				.title.content {
				text-align: start;
				}
			`}</style>
			</div>
		)
	}
}