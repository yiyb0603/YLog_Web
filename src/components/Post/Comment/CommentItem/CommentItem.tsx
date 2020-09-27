import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentModifyContainer from 'containers/CommentContainer/CommentModify';
import { IReplyTypes } from 'interface/ReplyTypes';
import ReplyItem from 'components/Post/Reply/ReplyItem';
import CommentLayout from 'components/Common/CommentLayout';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentItemProps {
	idx: number;
	postIdx: number;
	writer: string;
	contents: string;
	createdAt: string | Date;
	updatedAt: string | Date;
	replies: IReplyTypes[];
	requestCommentDelete: (idx: number) => Promise<void>;
	requestDeleteReply: (idx: number) => Promise<void>;
	requestCommentList: () => Promise<void>;
}

const CommentItem = ({
	idx,
	writer,
	contents,
	postIdx,
	createdAt,
	updatedAt,
	requestCommentDelete,
	replies,
	requestDeleteReply,
	requestCommentList,
}: CommentItemProps) => {
	const [isModify, setIsModify] = useState<boolean>(false);

	return (
		<div className={cx('CommentItem')}>
			<CommentLayout
				idx={idx}
				writer={writer}
				contents={contents}
				postIdx={postIdx}
				createdAt={createdAt}
				updatedAt={updatedAt}
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
							commentIdx,
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
									commentIdx={commentIdx}
									requestDeleteReply={requestDeleteReply}
									requestCommentList={requestCommentList}
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
