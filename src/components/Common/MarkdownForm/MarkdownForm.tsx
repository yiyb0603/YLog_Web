import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

interface MarkdownFormProps {
	contents: string;
	setContents: Dispatch<SetStateAction<string>>;
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

const MarkdownForm = ({ contents, setContents }: MarkdownFormProps) => {
	return (
		<MdEditor
			value={contents}
			onChange={({ text }) => setContents(text)}
			style={{ height: '80vh' }}
			renderHTML={(text) => mdParser.render(text)}
			placeholder="내용을 입력하세요..."
		/>
	);
};

export default MarkdownForm;
