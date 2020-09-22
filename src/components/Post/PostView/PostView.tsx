import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPostListTypes } from 'interface/PostTypes';
import ReactMarkdown from 'react-markdown';
import timeCounting from 'time-counting';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';

const style = require('./PostView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPostViewProps {
	postInfo: IPostListTypes;
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

const PostView = ({ postInfo }: IPostViewProps) => {
	const {
		title,
		introduction,
		writer,
		created_at,
		contents,
		category_idx,
		thumbnail,
		writer_id,
	} = postInfo;

	return (
		<div className={cx('PostView')}>
			<div className={cx('PostView-Contents')}>
				<div className={cx('PostView-Contents-Title')}>{title}</div>
				<div className={cx('PostView-Contents-Info')}>
					<div>{timeCounting(created_at!, { lang: 'ko' })}</div>
					<div>{writer}</div>
				</div>
				<img
					src={thumbnail ? thumbnail : '/icon/Logo.PNG'}
					alt="thumbnail"
					className={cx('PostView-Contents-Thumbnail')}
				/>
				<div className={cx('PostView-Contents-Introduction')}>
					{introduction}
				</div>

				<div className={cx('PostView-Contents-Contents')}>
					<ReactMarkdown source={contents} escapeHtml={false} />
				</div>
			</div>
		</div>
	);
};

export default PostView;
