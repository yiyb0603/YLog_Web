import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import parseTime from 'lib/TimeCounting';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentItemProps {
	idx: number;
	postIdx: number;
	writer: string;
	contents: string;
	createdAt: string | Date;
	updatedAt: string | Date;
}

const CommentItem = ({
	idx,
	writer,
	contents,
	postIdx,
	createdAt,
	updatedAt,
}: CommentItemProps) => {
	return (
		<div className={cx('CommentItem')}>
			<div className={cx('CommentItem-Contents')}>
				<img
					src="/icon/profile_default.jpg"
					alt="profile"
					className={cx('CommentItem-Contents-Profile')}
				/>

				<div className={cx('CommentItem-Contents-InfoWrapper')}>
					<div className={cx('CommentItem-Contents-InfoWrapper-Top')}>
						<div className={cx('CommentItem-Contents-InfoWrapper-Top-Writer')}>
							{writer === null ? '게스트' : writer}
						</div>
						<div className={cx('CommentItem-Contents-InfoWrapper-Top-Time')}>
							{parseTime(createdAt)}
						</div>
					</div>

					<div>{contents}</div>
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
