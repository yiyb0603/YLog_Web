import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownForm from '../MarkdownForm';

const style = require('./NoticeForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeFormProps {
	titleObject: {
		title: string;
		setTitle: Dispatch<SetStateAction<string>>;
	};

	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	requestFunction: () => Promise<void>;
}

const NoticeForm = ({
	titleObject,
	contentsObject,
	requestFunction,
}: NoticeFormProps) => {
	const { title, setTitle } = titleObject;
	const { contents, setContents } = contentsObject;

	return (
		<div className={cx('NoticeForm')}>
			<div className={cx('NoticeForm-Top')}>
				<input
					className={cx('NoticeForm-Top-Title')}
					type="text"
					placeholder="제목을 입력하세요..."
					value={title}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
				/>
			</div>

			<MarkdownForm contents={contents} setContents={setContents} />

			<div className={cx('NoticeForm-Button')}>
				{/* <button className={cx('CreateNotice-Button-Save')}>임시 저장</button> */}
				<button
					className={cx('NoticeForm-Button-Write')}
					onClick={requestFunction}
				>
					작성 완료
				</button>
			</div>
		</div>
	);
};

export default NoticeForm;
