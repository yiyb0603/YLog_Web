import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import parseTime from 'lib/TimeCounting';
import CommentModifyContainer from 'containers/CommentContainer/CommentModify';

const style = require('./CommentItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentItemProps {
	idx: number;
	postIdx: number;
	writer: string;
	contents: string;
	createdAt: string | Date;
	updatedAt: string | Date;
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
}: CommentItemProps) => {
	const [isModify, setIsModify] = useState<boolean>(false);
	const beforeTime: string = parseTime(createdAt).concat(
		updatedAt !== null ? ' (수정됨)' : ''
	);

	return (
		<div className={cx('CommentItem')}>
			<div className={cx('CommentItem-Contents')}>
				<div className={cx('CommentItem-Contents-Left')}>
					<img
						src="/icon/profile_default.jpg"
						alt="profile"
						className={cx('CommentItem-Contents-Left-Profile')}
					/>

					<div className={cx('CommentItem-Contents-Left-InfoWrapper')}>
						<div className={cx('CommentItem-Contents-Left-InfoWrapper-Top')}>
							<div
								className={cx(
									'CommentItem-Contents-Left-InfoWrapper-Top-Writer'
								)}
							>
								{writer === null ? '게스트' : writer}
							</div>
							<div
								className={cx('CommentItem-Contents-Left-InfoWrapper-Top-Time')}
							>
								{beforeTime}
							</div>
						</div>

						{!isModify ? (
							<div>{contents}</div>
						) : (
							<CommentModifyContainer
								commentIdx={idx}
								commentValue={contents}
								onBlur={() => setIsModify(false)}
								isModify={isModify}
							/>
						)}
					</div>
				</div>

				{!isModify && (
					<div className={cx('CommentItem-Contents-Right')}>
						<div
							className={cx('CommentItem-Contents-Right-Modify')}
							onClick={() => setIsModify(true)}
						>
							수정
						</div>
						<div
							className={cx('CommentItem-Contents-Right-Delete')}
							onClick={() => requestCommentDelete(idx)}
						>
							삭제
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentItem;
