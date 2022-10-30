import Head from 'next/head';
import { useState } from 'react';
import QuillEditor from '../../../../components/QuillEditor';
import styles from '../../../../styles/Home.module.css';

export default function Home() {

	const [body, setBody] = useState('');  // Quill 에디터의 innerHTML을 담는 state
	const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state

	/* 외부에서 body의 수정이 일어난 경우 body에 자동으로 적용되지 않습니다!
	   이 함수를 호출했을 때 컴포넌트 내의 useEffect가 실행되어 body의 수정 사항이 적용됩니다.*/
	function rerenderBody() {
		setMountBody(mb => !mb);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>글 작성</title>
				<link rel="icon" href="/favicon.ico" />

				{/* 관련된 리소스 로드 */}
				<link href="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css" rel="stylesheet" />
				<script src="//cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.js"></script>
				<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/highlight.min.js"></script>
				<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
				<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.7.2/build/styles/default.min.css" />
				<link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.snow.css" />
			</Head>

			<h1 className={styles.title}>
				Quill Sample
			</h1>

			<div className="editor" style={{ width: '80%', marginTop: '40px' }}>
				<QuillEditor
					body={body}
					handleQuillChange={setBody}
					mountBody={mountBody}
				/>
			</div>
			<div style={{ width: '80%' }}>
				<p>body state 미리보기</p>
				{body}
			</div>
			<div>
				<button onClick={() => { setBody((b) => (b + '<p>수정</p>')) }}>body 수정 발생</button>
				<button onClick={rerenderBody}>body 수정 사항 적용</button>
			</div>
		</div>
	)
}
