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
import { onKeyDown } from 'lib/onKeyDown';

const style = require('./CommentWrite.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentWriteProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};
	requestCommentWrite: () => Promise<void>;
}

const CommentWrite = ({
	contentsObject,
	requestCommentWrite,
}: CommentWriteProps) => {
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const { contents, setContents } = contentsObject;

	return (
		<div
			className={cx('CommentWrite', {
				'CommentWrite-Focus': isFocus,
			})}
		>
			<input
				className={cx('CommentWrite-Form')}
				type="text"
				placeholder="댓글을 입력하세요..."
				value={contents}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setContents(e.target.value)
				}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					onKeyDown(e, requestCommentWrite)
				}
			/>

			<BiSend className={cx('CommentWrite-Form-Send')} />
		</div>
	);
};

export default CommentWrite;
