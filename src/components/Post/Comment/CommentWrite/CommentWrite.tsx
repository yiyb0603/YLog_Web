import React, {
	useState,
	ChangeEvent,
	Dispatch,
	SetStateAction,
	KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSend } from 'react-icons/bi';
import { AiFillUnlock, AiFillLock } from 'react-icons/ai';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import { Palette } from 'styles/Palette/Palette';

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

	return (
		<div className={cx('CommentWrite')}>
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
