import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentContainer from 'containers/CommentContainer';
import CommentWriteContainer from 'containers/CommentContainer/CommentWrite';
import parseTime from 'lib/TimeCounting';
import { ICategory } from 'interface/CategoryTypes';
import { IPost } from 'interface/PostTypes';
import dynamic from 'next/dynamic';
import LikeContainer from 'containers/LikeContainer';

const MarkdownRender = dynamic(() => import('components/Common/Markdown/MarkdownRender'));

const style = require('./PostView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPostViewProps {
	postInfo: IPost;
	commentCount: number;
	categoryName: ICategory;
}

const PostView = ({
	postInfo,
	commentCount,
	categoryName,
}: IPostViewProps) => {
	const {
		title,
		introduction,
		user,
		createdAt,
		updatedAt,
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
								{categoryName && categoryName.categoryName}
							</div>
						</div>
						<div className={cx('PostView-Contents-Info-Personal')}>
							<div className={cx('PostView-Contents-Info-Personal-Time')}>
								{parseTime(createdAt!)}
								{updatedAt && ' (수정됨)'}
							</div>
							<div className={cx('PostView-Contents-Info-Personal-Writer')}>
								{user?.name}
							</div>
						</div>
					</div>
					<div className={cx('PostView-Contents-Introduction')}>
						{introduction}
					</div>

					<div className={cx('PostView-Contents-Contents')}>
						<MarkdownRender contents={contents!} />
						
					</div>
				</div>

				<div className={cx('PostView-Comments')}>
					<div className={cx('PostView-Comments-Title')}>
						댓글 {commentCount}개
					</div>

					<CommentWriteContainer />
					<CommentContainer />
				</div>
			</div>
		</div>
	);
};

export default PostView;
