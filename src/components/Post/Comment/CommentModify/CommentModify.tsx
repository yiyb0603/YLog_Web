import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
	useEffect,
	useRef,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { onKeyDown } from 'lib/onKeyDown';

const style = require('./CommentModify.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};
	isModify: boolean;
	onBlur: () => void;
	requestCommentModify: () => Promise<void>;
}

const CommentModify = ({
	contentsObject,
	isModify,
	onBlur,
	requestCommentModify,
}: CommentModifyProps) => {
	const { contents, setContents } = contentsObject;
	const modifyRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isModify) {
			document.addEventListener('click', (event: any) => {
				if (modifyRef.current && !modifyRef.current.contains(event.target)) {
					onBlur();
				}
			});
		}
	}, [isModify]);

	return (
		<div className={cx('CommentModify')} ref={modifyRef}>
			<input
				type="text"
				value={contents}
				className={cx('CommentModify-Input')}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setContents(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					onKeyDown(e, requestCommentModify)
				}
				autoFocus={true}
			/>

			<button
				className={cx('CommentModify-Button')}
				onClick={requestCommentModify}
			>
				수정
			</button>
		</div>
	);
};

export default CommentModify;
