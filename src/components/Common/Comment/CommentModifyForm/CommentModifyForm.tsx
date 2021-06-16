import React, {
	KeyboardEvent,
	ChangeEvent,
	useEffect,
	useRef,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiFillUnlock, AiFillLock } from 'react-icons/ai';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import palette from 'styles/palette';
import CommentModifyFormProps from './CommentModifyForm.types';

const style = require('./CommentModifyForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const CommentModifyForm = ({
	contentsObject,
	isPrivateObject,
	modifyFunction,
	onBlur,
	isModify,
}: CommentModifyFormProps): JSX.Element => {
	const modifyRef = useRef<HTMLInputElement | null>(null);

	const { contents, setContents } = contentsObject;
	const { isPrivate, setIsPrivate } = isPrivateObject;

	const { primary, gray } = palette;

	useEffect(() => {
		if (isModify) {
			document.addEventListener('click', (event: any) => {
				if (String(event.target).includes('SVG')) {
					return;
				}

				if (modifyRef.current && !modifyRef.current.contains(event.target)) {
					onBlur();
				}
			});
		}
	}, [isModify, modifyRef]);

	return (
		<div className={cx('CommentModifyForm')} ref={modifyRef}>
			<input
				type='text'
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

			<div className ={cx('CommentModifyForm-Right')}>
				<div className ={cx('CommentModifyForm-Right-Icon')}>
				{
					isPrivate ?
					<AiFillLock
						style={{ color: primary }}
						onClick={() => setIsPrivate(false)}
					/>
					: <AiFillUnlock
							style={{ color: gray }}
							onClick={() => setIsPrivate(true)}
						/>
				}
				</div>
				
				<button
					className={cx('CommentModifyForm-Right-Button')}
					onClick={modifyFunction}
				>
					수정
				</button>
			</div>
		</div>
	);
};

export default CommentModifyForm;
