import React, {
	Dispatch,
	SetStateAction,
	KeyboardEvent,
	ChangeEvent,
	useEffect,
	useRef,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useKeyDown } from 'lib/hooks/useKeyDown';

const style = require('./CommentModifyForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentModifyFormProps {
	contents: string;
	setContents: Dispatch<SetStateAction<string>>;
	modifyFunction: () => Promise<void>;
	onBlur: () => void;
	isModify: boolean;
}

const CommentModifyForm = ({
	contents,
	setContents,
	modifyFunction,
	onBlur,
	isModify,
}: CommentModifyFormProps) => {
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
		<div className={cx('CommentModifyForm')} ref={modifyRef}>
			<input
				type="text"
				value={contents}
				className={cx('CommentModifyForm-Input')}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setContents(e.target.value)
				}
				onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
					useKeyDown(e, modifyFunction)
				}
				autoFocus={true}
			/>

			<button
				className={cx('CommentModifyForm-Button')}
				onClick={modifyFunction}
			>
				수정
			</button>
		</div>
	);
};

export default CommentModifyForm;
