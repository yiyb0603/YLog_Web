import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentItem from './CommentItem';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {
	commentReplyList: any[];
	requestCommentDelete: (idx: number) => Promise<void>;
	requestDeleteReply: (idx: number) => Promise<void>;
	requestCommentList: () => Promise<void>;
}

const Comment = ({
	requestCommentDelete,
	commentReplyList,
	requestDeleteReply,
	requestCommentList,
}: CommentProps) => {
	return (
		<div className={cx('Comment')}>
			{commentReplyList.map((comment: any) => {
				const {
					idx,
					writer,
					contents,
					created_at,
					postIdx,
					updatedAt,
					replies,
				} = comment;
				return (
					<CommentItem
						key={idx}
						idx={idx!}
						writer={writer!}
						contents={contents!}
						createdAt={created_at!}
						postIdx={postIdx!}
						updatedAt={updatedAt!}
						replies={replies}
						requestCommentDelete={requestCommentDelete}
						requestDeleteReply={requestDeleteReply}
						requestCommentList={requestCommentList}
					/>
				);
			})}
		</div>
	);
};

export default Comment;
