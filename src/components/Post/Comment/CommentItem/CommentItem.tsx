import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentModifyContainer from 'containers/CommentContainer/CommentModify';
import ReplyItem from 'components/Post/Reply/ReplyItem';
import CommentLayout from 'components/Common/Comment/CommentLayout';
import CommentItemProps from './CommentItem.types';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

const CommentItem = ({
	idx,
	writer,
	writerIdx,
	writerProfile,
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
				writer={writer}
				writerIdx={writerIdx}
				writerProfile={writerProfile}
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
				{replies && replies.length > 0 ? (
					replies.map((reply: any, index: number) => {
						const {
							contents,
							repliedAt,
							updatedAt,
							writer,
							writerIdx,
							commentIdx,
							isPrivate,
						} = reply;

						return (
							reply.commentIdx === idx && (
								<ReplyItem
									key={index}
									idx={reply.idx}
									contents={contents}
									repliedAt={repliedAt}
									updatedAt={updatedAt}
									writer={writer}
									writerIdx={writerIdx}
									writerProfile={reply.writerProfile}
									commentIdx={commentIdx}
									requestDeleteReply={requestDeleteReply}
									requestCommentList={requestCommentList}
									isPrivate ={isPrivate}
								/>
							)
						);
					})
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
