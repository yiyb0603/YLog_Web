import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import 'react-markdown-editor-lite/lib/index.css';
import { ClassNamesFn } from 'classnames/types';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import SelectBox from 'components/Common/SelectBox';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';
import TitleInput from 'components/Common/Input/TitleInput';

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
	requestThumbnailUpload: (e: ChangeEvent<HTMLInputElement>) => void;
	requestImageUpload: (file: File) => Promise<string>;
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
	requestThumbnailUpload,
	requestImageUpload,
	requestWritePost,
}: PostWriteFormProps) => {
	const { title, setTitle } = titleObject;
	const { introduction, setIntroduction } = introductionObject;
	const { contents, setContents } = contentsObject;
	const { setCategoryIdx } = categoryIdxObject;

	return (
		<div className={cx('PostWriteForm')}>
			<div className={cx('PostWriteForm-Top')}>
				<TitleInput title ={title} setTitle ={setTitle} width ="400px" />

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

			<input type="file" onChange={requestThumbnailUpload} />

			<MarkdownForm contents={contents} setContents={setContents} requestImageUpload ={requestImageUpload} />

			<div className={cx('PostWriteForm-Button')}>
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
