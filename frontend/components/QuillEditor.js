import { useState, useEffect, useRef } from 'react';

export default function QuillEditor({ body, handleQuillChange, mountBody }) {
	const quillElement = useRef();
	const quillInstance = useRef();

	const [isError, setIsError] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (isLoaded) {
			/* isLoaded가 true인 상태에서 rerenderBody를 통해 body 적용시 Quill 초기화 없이
			   innerHTML만 body로 바꿉니다. 이 조건이 없을 시 툴바가 중복되어 여러 개 나타나게
			   됩니다. */
			const quill = quillInstance.current;
			quill.root.innerHTML = body;
			return;
		}
		if (quillElement.current && window.Quill) {
			/* isLoaded가 false일 때는 Quill을 초기화합니다. */

			/* Quill 옵션을 원하는 대로 수정하세요. */
			const toolbarOptions = {
				container: [
					[{ 'size': ['small', false, 'large', 'huge'] }],    // custom dropdown
					[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					[{ 'align': [] }],
					['bold', 'italic', 'underline', 'strike'],          // toggled buttons
					[{ 'color': [] }, { 'background': [] }],            // dropdown with defaults from theme
					[{ 'header': 1 }, { 'header': 2 }],                 // custom button values
					[{ 'list': 'ordered' }, { 'list': 'bullet' }],
					[{ 'script': 'sub' }, { 'script': 'super' }],        // superscript/subscript
					[{ 'indent': '-1' }, { 'indent': '+1' }],            // outdent/indent
					[{ 'direction': 'rtl' }],                           // text direction
					['clean'],                                          // remove formatting button
					['blockquote', 'link', 'code-block', 'formula', 'image', 'video'] // media
				],
			};

			quillInstance.current = new window.Quill(quillElement.current, {
				modules: {
					history: {
						delay: 2000,
						maxStack: 500,
						userOnly: true
					},
					syntax: true,
					toolbar: toolbarOptions
				},
				placeholder: "글을 입력해 주세요",
				theme: 'snow'
			});

			const quill = quillInstance.current;

			quill.root.setAttribute("spellcheck", "false");

			// 초기 body state 적용
			quill.root.innerHTML = body;

			/* quill에서 text-change 이벤트 발생시에 setBody(innerHTML)을 통해 body를 업데이트합니다.
			   body가 업데이트되어도 useEffect 발생 조건 인자([isError, mountBody])에 body가 없으므로
			   QuillEditor 컴포넌트는 다시 렌더링되지 않습니다. 이는 입력 중 커서가 맨 앞으로 이동하는
			   문제를 방지합니다. 대신 외부에서 body가 수정되어도 rerenderBody가 호출되지 않으면 변경된
			   body가 적용되지 않습니다. */
			quill.on("text-change", () => {
				handleQuillChange(quill.root.innerHTML);
			});

			setIsLoaded(true);
		} else {
			/* quill.min.js가 로드되어 있지 않아 window.Quill이 undefined이면 isError가
			   계속 변경되면서 재시도합니다. */
			setIsError((prevIsError) => (!prevIsError));
		}
	}, [isError, mountBody]);

	const toolbar = document.querySelectorAll('.ql-toolbar.ql-snow');
	//console.log(toolbar)
	if (toolbar.length != 1) {

	}
	const editor = document.getElementsByClassName('editor');
	console.log(editor)


	return (
		<div ref={quillElement}></div>
	);
}
