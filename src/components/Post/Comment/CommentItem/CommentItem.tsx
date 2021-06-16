import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentModifyContainer from 'containers/CommentContainer/CommentModify';
import ReplyItem from 'components/Post/Reply/ReplyItem';
import CommentLayout from 'components/Common/Comment/CommentLayout';
import CommentItemProps from './CommentItem.types';
import { IReply } from 'interface/ReplyTypes';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

const CommentItem = ({
	idx,
	user,
	contents,
	postIdx,
	createdAt,
	updatedAt,
	requestCommentDelete,
	replies,
	isPrivate,
	requestDeleteReply,
	requestCommentList,
}: CommentItemProps) => {
	const [isModify, setIsModify] = useState<boolean>(false);

	return (
		<div className={cx('CommentItem')}>
			<CommentLayout
				idx={idx}
				user={user}
				contents={contents}
				postIdx={postIdx}
				createdAt={createdAt}
				updatedAt={updatedAt}
				isPrivate={isPrivate}
				deleteFunction={() => requestCommentDelete(idx)}
				commentType={0}
				requestCommentList={requestCommentList}
			>
				<CommentModifyContainer
					commentIdx={idx}
					commentValue={contents}
					onBlur={() => setIsModify(false)}
					isModify={isModify}
					setIsModify={setIsModify}
					defaultPrivate ={isPrivate}
				/>
			</CommentLayout>

			<div className={cx('CommentItem-Replies')}>
				{
					(replies && replies.length > 0) && (
					replies.map((reply: IReply, index: number) => {
						const {
							contents,
							repliedAt,
							updatedAt,
							user,
							comment,
							isPrivate,
						} = reply;

						return (
							reply.comment.idx === idx && (
								<ReplyItem
									key={index}
									idx={reply.idx}
									contents={contents}
									repliedAt={repliedAt!}
									updatedAt={updatedAt!}
									user={user}
									commentIdx={comment.idx}
									requestDeleteReply={requestDeleteReply}
									requestCommentList={requestCommentList}
									isPrivate ={isPrivate}
								/>
							)
						);
					})
				)}
			</div>
		</div>
	);
};

export default CommentItem;
