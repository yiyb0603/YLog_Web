import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownForm from 'components/Common/MarkdownForm';

const style = require('./CreateNotice.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CreateNoticeProps {
	titleObject: {
		title: string;
		setTitle: Dispatch<SetStateAction<string>>;
	};

	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	requestCreateNotice: () => Promise<void>;
}

const CreateNotice = ({
	titleObject,
	contentsObject,
	requestCreateNotice,
}: CreateNoticeProps) => {
	const { title, setTitle } = titleObject;
	const { contents, setContents } = contentsObject;

	return (
		<div className={cx('CreateNotice')}>
			<div className={cx('CreateNotice-Top')}>
				<input
					className={cx('CreateNotice-Top-Title')}
					type="text"
					placeholder="제목을 입력하세요..."
					value={title}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
				/>
			</div>

			<MarkdownForm contents={contents} setContents={setContents} />

			<div className={cx('CreateNotice-Button')}>
				{/* <button className={cx('CreateNotice-Button-Save')}>임시 저장</button> */}
				<button
					className={cx('CreateNotice-Button-Write')}
					onClick={requestCreateNotice}
				>
					작성 완료
				</button>
			</div>
		</div>
	);
};

export default CreateNotice;
