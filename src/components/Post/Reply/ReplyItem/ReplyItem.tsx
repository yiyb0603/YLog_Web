import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentLayout from 'components/Common/CommentLayout';
import ReplyModifyContainer from 'containers/ReplyContainer/ReplyModifyContainer';

const style = require('./ReplyItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyItemProps {
	idx: number;
	contents: string;
	writer: string | null;
	repliedAt: string | Date;
	updatedAt: string | Date;
	commentIdx: number;
	requestDeleteReply: (idx: number) => Promise<void>;
	requestCommentList: () => Promise<void>;
}

const ReplyItem = ({
	idx,
	contents,
	writer,
	repliedAt,
	updatedAt,
	commentIdx,
	requestDeleteReply,
	requestCommentList,
}: ReplyItemProps) => {
	const [isModify, setIsModify] = useState<boolean>(false);

	return (
		<div className={cx('ReplyItem')}>
			<CommentLayout
				idx={idx}
				contents={contents}
				writer={writer}
				createdAt={repliedAt}
				updatedAt={updatedAt}
				deleteFunction={() => requestDeleteReply(idx)}
				requestCommentList={requestCommentList}
				commentType={1}
			>
				<ReplyModifyContainer
					replyIdx={idx}
					commentIdx={commentIdx}
					replyValue={contents}
					isModify={isModify}
					setIsModify={setIsModify}
					requestCommentList={requestCommentList}
				/>
			</CommentLayout>
		</div>
	);
};

export default ReplyItem;