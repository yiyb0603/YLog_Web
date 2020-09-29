import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPostListTypes } from 'interface/PostTypes';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import CommentContainer from 'containers/CommentContainer';
import CommentWriteContainer from 'containers/CommentContainer/CommentWrite';
import parseTime from 'lib/TimeCounting';
import { ICategoryListTypes } from 'interface/CategoryTypes';

const style = require('./PostView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPostViewProps {
	postInfo: IPostListTypes;
	categoryName: ICategoryListTypes;
}

const PostView = ({ postInfo, categoryName }: IPostViewProps) => {
	const {
		title,
		introduction,
		writer,
		created_at,
		updated_at,
		contents,
		comment_length,
		thumbnail,
	} = postInfo;

	return (
		<div className={cx('PostView')}>
			<div className={cx('PostView-Contents')}>
				<div className={cx('PostView-Contents-Title')}>{title}</div>
				<div className={cx('PostView-Contents-Info')}>
					<div className={cx('PostView-Contents-Info-Category')}>
						{categoryName && categoryName.category_name}
					</div>
					<div className={cx('PostView-Contents-Info-Personal')}>
						<div>
							{parseTime(created_at!)}
							{updated_at && ' (수정됨)'}
						</div>
						<div className={cx('PostView-Contents-Info-Personal-Writer')}>
							{writer}
						</div>
					</div>
				</div>
				<img
					src={thumbnail ? thumbnail : '/icon/Logo.PNG'}
					alt="thumbnail"
					className={cx('PostView-Contents-Thumbnail')}
					onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
						(e.currentTarget.src = '/icon/Logo.PNG')
					}
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

			<div className={cx('PostView-Comments')}>
				<div className={cx('PostView-Comments-Title')}>
					댓글 {comment_length}개
				</div>

				<CommentWriteContainer />
				<CommentContainer />
			</div>
		</div>
	);
};

export default PostView;
