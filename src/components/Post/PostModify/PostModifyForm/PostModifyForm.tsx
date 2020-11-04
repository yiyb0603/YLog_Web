import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SelectBox from 'components/Common/SelectBox';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import Thumbnail from 'components/Common/Button/Thumbnail';
import dynamic from 'next/dynamic';
import PostModifyFormProps from './PostModifyForm.types';

const MarkdownForm = dynamic(() => import('components/Common/Markdown/MarkdownForm'));

const style = require('./PostModifyForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostModifyForm = ({
	categoryList,
	titleObject,
	thumbnailObject,
	introductionObject,
	contentsObject,
	categoryIdxObject,
	requestThumbnailUpload,
	requestImageUpload,
	requestModifyPost,
}: PostModifyFormProps) => {
	const { title, setTitle } = titleObject;
	const { thumbnail, setThumbnail } = thumbnailObject;
	const { introduction, setIntroduction } = introductionObject;
	const { categoryIdx, setCategoryIdx } = categoryIdxObject;
	const { contents, setContents } = contentsObject;

	const findCategory: ICategoryListTypes | undefined = categoryList.find(
		(category: ICategoryListTypes) => category.idx === categoryIdx
	);

	const filterCategories: ICategoryListTypes[] = categoryList.filter(
		(category: ICategoryListTypes) => category.idx !== categoryIdx
	);

	return (
		<div className={cx('PostModifyForm')}>
			<div className={cx('PostModifyForm-Top')}>
				<input
					className={cx('PostModifyForm-Top-Title')}
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
					<option value={findCategory?.idx}>
						{findCategory?.category_name}
					</option>
					{categoryList &&
						filterCategories.map((category: ICategoryListTypes) => {
							const { idx, category_name } = category;
							return (
								<option value={idx} key={idx}>
									{category_name}
								</option>
							);
						})}
				</SelectBox>
			</div>

			<div className={cx('PostModifyForm-Introduction')}>
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

			<div className={cx('PostModifyForm-Button')}>
				{/* <button className={cx('PostModifyForm-Button-Save')}>임시 저장</button> */}
				<button
					className={cx('PostModifyForm-Button-Write')}
					onClick={requestModifyPost}
				>
					작성 완료
				</button>
			</div>
		</div>
	);
};

export default PostModifyForm;
