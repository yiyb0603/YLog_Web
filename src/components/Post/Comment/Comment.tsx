import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ICommentResponseTypes } from 'interface/CommentTypes';
import CommentItem from './CommentItem';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {
	commentList: ICommentResponseTypes[];
	requestCommentDelete: (idx: number) => Promise<void>;
}

const Comment = ({ commentList, requestCommentDelete }: CommentProps) => {
	return (
		<div className={cx('Comment')}>
			{commentList.map((comment: ICommentResponseTypes) => {
				const {
					idx,
					writer,
					contents,
					created_at,
					post_idx,
					updated_at,
				} = comment;
				return (
					<CommentItem
						key={idx}
						idx={idx!}
						writer={writer!}
						contents={contents!}
						createdAt={created_at!}
						postIdx={post_idx!}
						updatedAt={updated_at!}
						requestCommentDelete={requestCommentDelete}
					/>
				);
			})}
		</div>
	);
};

export default Comment;
