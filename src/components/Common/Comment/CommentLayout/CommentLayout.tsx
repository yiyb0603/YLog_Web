import React, { SyntheticEvent, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import parseTime from 'lib/TimeCounting';
import ReplyCreateContainer from 'containers/ReplyContainer/ReplyCreateContainer';
import PrivateComment from '../PrivateComment';
import getMyInfo from 'lib/util/getMyInfo';
import CommentLayoutProps from './CommentLayout.types';
import { IUser } from 'interface/AuthTypes';

const style = require('./CommentLayout.scss');
const cx: ClassNamesFn = classNames.bind(style);

const CommentLayout = ({
	idx,
	user,
	contents,
	createdAt,
	updatedAt,
	isPrivate,
	children,
	deleteFunction,
	commentType,
}: CommentLayoutProps): JSX.Element => {
	const [isReply, setIsReply] = useState<boolean>(false);
	const [commentIdx, setCommentIdx] = useState<number>(0);

	const PROFILE_DEFAULT: string = '/assets/icon/profile_default.jpg';
	const beforeTime: string = parseTime(createdAt);
	const myInfo: IUser = getMyInfo();

	return (
		<div
			className={cx('CommentLayout', {
				'CommentLayout-Reply': commentType === 1,
			})}
		>
			<div className={cx('CommentLayout-Contents')}>
				<div className={cx('CommentLayout-Contents-Left')}>
					<img
						src={user.profileImage ? user.profileImage : PROFILE_DEFAULT}
						onError={(e: SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = PROFILE_DEFAULT}
						alt='profile'
						className={cx('CommentLayout-Contents-Left-Profile')}
					/>

					{
						isPrivate && (!myInfo || myInfo.idx !== user.idx) && !myInfo.isAdmin ?
						<PrivateComment type ={commentType} />
						: <div className={cx('CommentLayout-Contents-Left-InfoWrapper')}>
							<div className={cx('CommentLayout-Contents-Left-InfoWrapper-Top')}>
								<div
									className={cx(
										'CommentLayout-Contents-Left-InfoWrapper-Top-Writer'
									)}
								>
									{!user ? '게스트' : user.name}
								</div>
								<div
									className={cx(
										'CommentLayout-Contents-Left-InfoWrapper-Top-Time'
									)}
								>
									{beforeTime}

									<span>{isPrivate && '(비공개)'}</span>
								</div>
							</div>

							{children && !children.props.isModify ? (
								<div>{contents}</div>
							) : (
								children && children
							)}
							{commentType === 0 && (
								<div
									className={cx('CommentLayout-Contents-ReplyButton')}
									onClick={() => {
										setIsReply(!isReply);
										setCommentIdx(idx);
									}}
								>
									답글
								</div>
							)}
						</div>
					}
				</div>

				{
					children &&
					!children.props.isModify &&
					(myInfo && (myInfo.idx === user.idx || myInfo.isAdmin)) && (
						<div className={cx('CommentLayout-Contents-Right')}>
							<div
								className={cx('CommentLayout-Contents-Right-Modify')}
								onClick={() => children.props.setIsModify(true)}
							>
								수정
							</div>
							<div
								className={cx('CommentLayout-Contents-Right-Delete')}
								onClick={() => deleteFunction(idx)}
							>
								삭제
							</div>
						</div>
					)
				}
			</div>
			{isReply && (
				<ReplyCreateContainer
					setIsReply={setIsReply}
					commentIdx={commentIdx}
				/>
			)}
		</div>
	);
};

export default CommentLayout;
