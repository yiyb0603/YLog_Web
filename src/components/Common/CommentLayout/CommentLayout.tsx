import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import parseTime from 'lib/TimeCounting';
import SecureLS from 'secure-ls';
import { IUserInfoTypes } from 'interface/AuthTypes';
import { BiSend } from 'react-icons/bi';

const style = require('./CommentLayout.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentLayoutProps {
	idx: number;
	writer: string | null;
	contents: string;
	postIdx?: number;
	createdAt: string | Date;
	updatedAt: string | Date;
	children?: any;
	deleteFunction: any;
	commentType: number;
}

const CommentLayout = ({
	idx,
	writer,
	contents,
	createdAt,
	updatedAt,
	children,
	deleteFunction,
	commentType,
}: CommentLayoutProps) => {
	const [isReply, setIsReply] = useState<boolean>(false);

	const beforeTime: string = parseTime(createdAt);
	const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
	const myInfo: IUserInfoTypes = ls.get('userInfo');

	return (
		<div
			className={cx('CommentLayout', {
				'CommentLayout-Reply': commentType === 1,
			})}
		>
			<div className={cx('CommentLayout-Contents')}>
				<div className={cx('CommentLayout-Contents-Left')}>
					<img
						src="/icon/profile_default.jpg"
						alt="profile"
						className={cx('CommentLayout-Contents-Left-Profile')}
					/>

					<div className={cx('CommentLayout-Contents-Left-InfoWrapper')}>
						<div className={cx('CommentLayout-Contents-Left-InfoWrapper-Top')}>
							<div
								className={cx(
									'CommentLayout-Contents-Left-InfoWrapper-Top-Writer'
								)}
							>
								{!writer ? '게스트' : writer}
							</div>
							<div
								className={cx(
									'CommentLayout-Contents-Left-InfoWrapper-Top-Time'
								)}
							>
								{beforeTime}
							</div>
						</div>

						{(children && !children.props.isModify) || commentType === 1 ? (
							<div>{contents}</div>
						) : (
							children && children
						)}
						{commentType === 0 && (
							<div
								className={cx('CommentLayout-Contents-ReplyButton')}
								onClick={() => setIsReply(!isReply)}
							>
								답글
							</div>
						)}
					</div>
				</div>

				{(children && !children.props.isModify && myInfo.name === writer) ||
				(!children && myInfo.is_admin) ? (
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
				) : (
					<></>
				)}
			</div>
			{isReply && (
				<div className={cx('CommentLayout-WriteReply')}>
					<input
						type="text"
						placeholder="답글을 입력하세요..."
						className={cx('CommentLayout-WriteReply-Write')}
					/>

					<BiSend className={cx('CommentLayout-WriteReply-Send')} />
				</div>
			)}
		</div>
	);
};

export default CommentLayout;
