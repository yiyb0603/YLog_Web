import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentModifyContainer from 'containers/CommentContainer/CommentModify';
import { IReplyTypes } from 'interface/ReplyTypes';
import ReplyItem from 'components/Post/ReplyItem';
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
			>
				<CommentModifyContainer
					commentIdx={idx}
					commentValue={contents}
					onBlur={() => setIsModify(false)}
					isModify={isModify}
					setIsModify={setIsModify}
				/>
			</CommentLayout>

			{/* <input type="text" placeholder="답글을 입력하세요..." /> */}

			<div className={cx('CommentItem-Replies')}>
				{replies.map((reply: any) => {
					const {
						idx,
						commentIdx,
						contents,
						repliedAt,
						updatedAt,
						writer,
					} = reply;
					return (
						<ReplyItem
							key={idx}
							idx={idx}
							contents={contents}
							repliedAt={repliedAt}
							updatedAt={updatedAt}
							writer={writer}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CommentItem;
