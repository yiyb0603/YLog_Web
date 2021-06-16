import React, { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import 'react-markdown-editor-lite/lib/index.css';
import { useCallback } from 'react';

interface MarkdownFormProps {
	contents: string;
	setContents: Dispatch<SetStateAction<string>>;
	requestImageUpload?: any;
}

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});

const mdParser: MarkdownIt = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: (str: string, lang: string) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (error) {
				throw new Error(error);
			}
		}
		return '';
	},
});

const MarkdownForm = ({ contents, setContents, requestImageUpload }: MarkdownFormProps) => {
	const handleImageUpload = useCallback((file: File) => {
		return new Promise(resolve => {
			const reader: FileReader = new FileReader();
			reader.onload = async () => {
				await requestImageUpload(file)
				.then((response: string) => {
					resolve(response);
				});
			};
			
			reader.readAsDataURL(file);
		});
	}, []);

	return (
		<MdEditor
			value={contents}
			onChange={({ text }) => setContents(text)}
			style={{ height: '80vh' }}
			renderHTML={(text) => mdParser.render(text)}
			placeholder="내용을 입력하세요..."
			onImageUpload={handleImageUpload}
		/>
	);
};

export default MarkdownForm;
