import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import SelectBox from 'components/Common/SelectBox';
import TitleInput from 'components/Common/Input/TitleInput';
import Thumbnail from 'components/Common/Button/Thumbnail';
import dynamic from 'next/dynamic';
import PostWriteFormProps from './PostWriteForm.types';

const MarkdownForm = dynamic(() => import('components/Common/Markdown/MarkdownForm'));

const style = require('./PostWriteForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostWriteForm = ({
	titleObject,
	thumbnailObject,
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
	const { thumbnail, setThumbnail } = thumbnailObject;

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

			<Thumbnail thumbnail ={thumbnail} requestThumbnailUpload ={requestThumbnailUpload} />
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
