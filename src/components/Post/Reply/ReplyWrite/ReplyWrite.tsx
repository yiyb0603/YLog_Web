import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSend } from 'react-icons/bi';
import { onKeyDown } from 'lib/onKeyDown';

const style = require('./ReplyWrite.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyWriteProps {
	contents: string | undefined;
	setContents: Dispatch<SetStateAction<string>> | undefined;
	requestCreateReply: () => Promise<void>;
}

const ReplyWrite = ({
	contents,
	setContents,
	requestCreateReply,
}: ReplyWriteProps) => {
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
					onKeyDown(e, requestCreateReply)
				}
			/>

			<BiSend
				className={cx('ReplyWrite-Send')}
				onClick={requestCreateReply}
			/>
		</div>
	);
};

export default ReplyWrite;
