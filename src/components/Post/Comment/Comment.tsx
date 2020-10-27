import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentItem from './CommentItem';
import NoComments from './NoComments';

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
			{commentReplyList.length > 0 ? (
				commentReplyList.map((comment: any, index: number) => {
					const {
						idx,
						writer,
						contents,
						created_at,
						postIdx,
						updatedAt,
						replies,
						writer_idx,
						writer_profile,
						is_private
					} = comment;

					return (
						<CommentItem
							key={index}
							idx={idx}
							writer={writer}
							writerIdx ={writer_idx}
							writerProfile={writer_profile}
							contents={contents}
							createdAt={created_at}
							postIdx={postIdx}
							updatedAt={updatedAt}
							replies={replies ? replies : []}
							isPrivate ={is_private}
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
