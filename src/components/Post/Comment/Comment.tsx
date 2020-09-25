import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ICommentResponseTypes } from 'interface/CommentTypes';
import CommentItem from './CommentItem';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {
	commentReplyList: any[];
	requestCommentDelete: (idx: number) => Promise<void>;
}

const Comment = ({ requestCommentDelete, commentReplyList }: CommentProps) => {
	return (
		<div className={cx('Comment')}>
			{commentReplyList.map((comment: any) => {
				const {
					idx,
					writer,
					contents,
					createdAt,
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
						createdAt={createdAt!}
						postIdx={postIdx!}
						updatedAt={updatedAt!}
						replies={replies}
						requestCommentDelete={requestCommentDelete}
					/>
				);
			})}
		</div>
	);
};

export default Comment;
