import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BsPen, BsPencil, BsTrash } from 'react-icons/bs';
import CreateCategoryContainer from 'containers/CategoryContainer/CreateCategory/CreateCategoryContainer';
import {
	ICategoryListTypes,
	IPostCategoryTypes,
} from 'interface/CategoryTypes';
import { NextRouter, useRouter } from 'next/router';
import ModifyCategoryContainer from 'containers/CategoryContainer/ModifyCategory/ModifyCategoryContainer';
import CategoryItem from './CategoryItem';
import SecureLS from 'secure-ls';

const style = require('./Category.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CategoryProps {
	categoryList: ICategoryListTypes[];
	requestDeleteCategory: (idx: number) => Promise<void>;
}

const Category = ({ categoryList, requestDeleteCategory }: CategoryProps) => {
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [isModify, setIsModify] = useState<boolean>(false);
	const [categoryInfo, setCategoryInfo] = useState<IPostCategoryTypes>({});

	const router: NextRouter = useRouter();
	const {
		query: { topic, keyword },
	}: NextRouter = router;

	if (typeof window !== 'undefined') {
		const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
		const { is_admin } = ls.get('userInfo');

		return (
			<div className={cx('Category')}>
				<div className={cx('Category-Title')}>
					<div>메뉴 목록</div>
					{is_admin && (
						<BsPencil
							className={cx('Category-Title-Pen')}
							onClick={() => setIsCreate(true)}
						/>
					)}
				</div>
				<ul className={cx('Category-List')}>
					<li className={cx('Category-List-Item')}>
						<span
							className={cx('Category-List-Item-Text', {
								'Category-List-Item-Text-Current': topic === undefined,
							})}
							onClick={() =>
								router.push(keyword ? `/?keyword=${keyword}` : `/`)
							}
						>
							전체보기
						</span>
					</li>

					{categoryList.map((category: ICategoryListTypes) => {
						const { idx, category_name } = category;

						return (
							<CategoryItem
								key={idx}
								idx={idx}
								categoryName={category_name}
								setCategoryInfo={setCategoryInfo}
								setIsModify={setIsModify}
								requestDeleteCategory={requestDeleteCategory}
							/>
						);
					})}
				</ul>

				{isCreate && (
					<CreateCategoryContainer
						handleCloseModal={() => setIsCreate(false)}
					/>
				)}

				{isModify && (
					<ModifyCategoryContainer
						handleCloseModal={() => setIsModify(false)}
						categoryInfo={categoryInfo}
					/>
				)}
			</div>
		);
	} else {
		return <></>;
	}
};

export default Category;
