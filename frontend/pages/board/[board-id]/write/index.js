import { useMemo, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function Write() {
    const [value, setValue] = useState('');
    const quillRef = useRef();

    const imageHandler = () => {
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
                editor.root.innerHTML += `<img src=${url} /><br/>`;
                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', url);
            } catch(ex) {console.error(ex); }
        });
        return;
    }
    
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'image',
    ];
    const modules = {
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
    
    return <div>
        <QuillWrapper
            forwardedRef={quillRef}
            theme="snow"
            modules={modules}
            formats={formats} />
    </div>
}

const QuillWrapper = dynamic(
    async () => {
    const {default: RQ} = await import('react-quill');
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
}, {
    ssr: false,
    loading: () => <p>Loading...</p>
});
