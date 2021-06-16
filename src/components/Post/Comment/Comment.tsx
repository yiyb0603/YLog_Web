import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentItem from './CommentItem';
import NoComments from './NoComments';
import { IComment } from 'interface/CommentTypes';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {
	commentReplyList: IComment[];
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
			{
				commentReplyList.length > 0 ? (
				commentReplyList.map((comment: IComment, index: number) => {
					const {
						idx,
						contents,
						isPrivate,
						createdAt,
						updatedAt,
						replies,
						post,
						user,
					} = comment;

					return (
						<CommentItem
							key={index}
							idx={idx}
							user={user!}
							contents={contents!}
							createdAt={createdAt!}
							postIdx={post?.idx!}
							updatedAt={updatedAt!}
							replies={replies ? replies : []}
							isPrivate ={isPrivate!}
							requestCommentDelete={requestCommentDelete}
							requestDeleteReply={requestDeleteReply}
							requestCommentList={requestCommentList}
						/>
					);
				})
			) : (
				<NoComments />
			)}
		</div>
	);
};

export default Comment;
