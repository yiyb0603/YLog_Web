import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPostListTypes } from 'interface/PostTypes';
import ReactMarkdown from 'react-markdown';
import timeCounting from 'time-counting';
import CodeBlock from './CodeBlock';

const style = require('./PostView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPostViewProps {
	postInfo: IPostListTypes;
}

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
					<ReactMarkdown
						source={contents}
						escapeHtml={false}
						renderers={{ code: CodeBlock }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PostView;
