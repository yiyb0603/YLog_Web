import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import 'react-markdown-editor-lite/lib/index.css';
import { ClassNamesFn } from 'classnames/types';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import SelectBox from 'components/Common/SelectBox';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';

interface PostWriteFormProps {
	titleObject: {
		title: string;
		setTitle: Dispatch<SetStateAction<string>>;
	};

	introductionObject: {
		introduction: string;
		setIntroduction: Dispatch<SetStateAction<string>>;
	};

	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	categoryIdxObject: {
		categoryIdx: number;
		setCategoryIdx: Dispatch<SetStateAction<number>>;
	};

	categoryList: ICategoryListTypes[];
	requestFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
	requestWritePost: () => Promise<void>;
}

const style = require('./PostWriteForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostWriteForm = ({
	titleObject,
	introductionObject,
	contentsObject,
	categoryIdxObject,
	categoryList,
	requestFileUpload,
	requestWritePost,
}: PostWriteFormProps) => {
	const { title, setTitle } = titleObject;
	const { introduction, setIntroduction } = introductionObject;
	const { contents, setContents } = contentsObject;
	const { setCategoryIdx } = categoryIdxObject;

	return (
		<div className={cx('PostWriteForm')}>
			<div className={cx('PostWriteForm-Top')}>
				<input
					className={cx('PostWriteForm-Top-Title')}
					type="text"
					placeholder="제목을 입력하세요..."
					value={title}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
				/>

				<SelectBox
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setCategoryIdx(Number(e.target.value))
					}
				>
					<option value={-1}>카테고리 선택</option>
					{categoryList.map((category: ICategoryListTypes) => {
						const { idx, category_name } = category;
						return (
							<option value={idx} key={idx}>
								{category_name}
							</option>
						);
					})}
				</SelectBox>
			</div>

			<div className={cx('PostWriteForm-Introduction')}>
				<input
					type="text"
					placeholder="소개를 입력하세요..."
					value={introduction}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setIntroduction(e.target.value)
					}
				/>
			</div>

			<input type="file" onChange={requestFileUpload} />

			<MarkdownForm contents={contents} setContents={setContents} />

			<div className={cx('PostWriteForm-Button')}>
				{/* <button className={cx('PostWriteForm-Button-Save')}>임시 저장</button> */}
				<button
					className={cx('PostWriteForm-Button-Write')}
					onClick={requestWritePost}
				>
					작성 완료
				</button>
			</div>
		</div>
	);
};

export default PostWriteForm;
