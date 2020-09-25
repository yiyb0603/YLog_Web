import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentLayout from 'components/Common/CommentLayout';

const style = require('./ReplyItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyItemProps {
	idx: number;
	contents: string;
	writer: string | null;
	repliedAt: string | Date;
	updatedAt: string | Date;
}

const ReplyItem = ({
	idx,
	contents,
	writer,
	repliedAt,
	updatedAt,
}: ReplyItemProps) => {
	return (
		<div className={cx('ReplyItem')}>
			<CommentLayout
				idx={idx}
				contents={contents}
				writer={writer}
				createdAt={repliedAt}
				updatedAt={updatedAt}
				deleteFunction={() => {}}
				commentType={1}
			/>
		</div>
	);
};

export default ReplyItem;
