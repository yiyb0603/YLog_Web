import React, {
	useState,
	ChangeEvent,
	Dispatch,
	SetStateAction,
	KeyboardEvent,
	SyntheticEvent,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSend } from 'react-icons/bi';
import { AiFillUnlock, AiFillLock } from 'react-icons/ai';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import { Palette } from 'styles/Palette/Palette';
import getMyInfo from 'lib/util/getMyInfo';

const style = require('./CommentWrite.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentWriteProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	isPrivateObject: {
		isPrivate: boolean;
		setIsPrivate: Dispatch<SetStateAction<boolean>>;
	};

	requestCommentWrite: () => Promise<void>;
}

const CommentWrite = ({
	contentsObject,
	isPrivateObject,
	requestCommentWrite,
}: CommentWriteProps) => {
	const { contents, setContents } = contentsObject;
	const { isPrivate, setIsPrivate } = isPrivateObject;

	const { primary } = Palette;
	const profileImage: string | null = !getMyInfo() ? null : getMyInfo().profile_image;
	const PROFILE_DEFAULT: string = '/assets/icon/profile_default.jpg';

	return (
		<div className={cx('CommentWrite')}>
			<img className ={cx('CommentWrite-ProfileImage')}
				src ={profileImage ? profileImage : PROFILE_DEFAULT} alt ="profile"
				onError={(e: SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = PROFILE_DEFAULT}
			/>

			<input
				className={cx('CommentWrite-Form')}
				type="text"
				placeholder="댓글을 입력하세요..."
				value={contents}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setContents(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					useKeyDown(e, requestCommentWrite)
				}
			/>

			<div className ={cx('CommentWrite-IconWrapper')}>
				{
					isPrivate ?
						<AiFillLock style ={{ color: primary }} onClick ={() => setIsPrivate(false)} />
						: <AiFillUnlock onClick ={() => setIsPrivate(true)} />
				}
				<BiSend className={cx('CommentWrite-IconWrapper-Send')} onClick ={requestCommentWrite} />
			</div>
		</div>
	);
};

export default CommentWrite;
