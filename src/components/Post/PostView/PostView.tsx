import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPostListTypes } from 'interface/PostTypes';
import CommentContainer from 'containers/CommentContainer';
import CommentWriteContainer from 'containers/CommentContainer/CommentWrite';
import parseTime from 'lib/TimeCounting';
import { ICategoryList } from 'interface/CategoryTypes';
import dynamic from 'next/dynamic';
import LikeContainer from 'containers/LikeContainer';

const MarkdownRender = dynamic(() => import('components/Common/Markdown/MarkdownRender'));

const style = require('./PostView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPostViewProps {
	postInfo: IPostListTypes;
	commentLength: number;
	categoryName: ICategoryList;
}

const PostView = ({ postInfo, commentLength, categoryName }: IPostViewProps) => {
	const {
		title,
		introduction,
		writer,
		created_at,
		updated_at,
		contents,
		thumbnail,
	} = postInfo;

	return (
		<div className={cx('PostView')}>
			<div className={cx('PostView-Like')}>
				<LikeContainer />
			</div>

			<div className={cx('PostView-Right')}>
				<div className={cx('PostView-Contents')}>
					<div className={cx('PostView-Contents-Title')}>{title}</div>
					<div className={cx('PostView-Contents-Info')}>
						<div className={cx('PostView-Contents-Info-Left')}>
							<div className={cx('PostView-Contents-Info-Left-Like')}>
								<LikeContainer />
							</div>
							<div className={cx('PostView-Contents-Info-Left-Category')}>
								{categoryName && categoryName.category_name}
							</div>
						</div>
						<div className={cx('PostView-Contents-Info-Personal')}>
							<div className={cx('PostView-Contents-Info-Personal-Time')}>
								{parseTime(created_at!)}
								{updated_at && ' (수정됨)'}
							</div>
							<div className={cx('PostView-Contents-Info-Personal-Writer')}>
								{writer}
							</div>
						</div>
					</div>
					<img
						src={thumbnail ? thumbnail : '/assets/icon/Logo.PNG'}
						alt="thumbnail"
						className={cx('PostView-Contents-Thumbnail')}
						onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
							(e.currentTarget.src = '/assets/icon/Logo.PNG')
						}
					/>
					<div className={cx('PostView-Contents-Introduction')}>
						{introduction}
					</div>

					<div className={cx('PostView-Contents-Contents')}>
						<MarkdownRender contents={contents!} />
						
					</div>
				</div>

				<div className={cx('PostView-Comments')}>
					<div className={cx('PostView-Comments-Title')}>
						댓글 {commentLength}개
					</div>

					<CommentWriteContainer />
					<CommentContainer />
				</div>
			</div>
		</div>
	);
};

export default PostView;
