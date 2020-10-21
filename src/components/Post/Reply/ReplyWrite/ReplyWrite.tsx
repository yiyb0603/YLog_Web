import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSend } from 'react-icons/bi';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { Palette } from 'styles/Palette/Palette';

const style = require('./ReplyWrite.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyWriteProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	isPrivateObject: {
		isPrivate: boolean;
		setIsPrivate: Dispatch<SetStateAction<boolean>>;
	};

	requestCreateReply: () => Promise<void>;
}

const ReplyWrite = ({
	contentsObject,
	isPrivateObject,
	requestCreateReply,
}: ReplyWriteProps) => {
	const { primary } = Palette;
	const { contents, setContents } = contentsObject;
	const { isPrivate, setIsPrivate } = isPrivateObject;

	return (
		<div className={cx('ReplyWrite')}>
			<input
				type="text"
				placeholder="답글을 입력하세요..."
				className={cx('ReplyWrite-Write')}
				value={contents}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setContents!(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					useKeyDown(e, requestCreateReply)
				}
			/>

			<div className ={cx('ReplyWrite-IconWrapper')}>
				{
					isPrivate ?
						<AiFillLock style ={{ color: primary }} onClick ={() => setIsPrivate(false)} />
						: <AiFillUnlock onClick ={() => setIsPrivate(true)} />
				}
				<BiSend
					className={cx('ReplyWrite-Send')}
					onClick={requestCreateReply}
				/>
			</div>
		</div>
	);
};

export default ReplyWrite;
