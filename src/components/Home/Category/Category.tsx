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
		query: { topic },
	}: NextRouter = router;

	return (
		<div className={cx('Category')}>
			<div className={cx('Category-Title')}>
				<div>메뉴 목록</div>
				<BsPencil
					className={cx('Category-Title-Pen')}
					onClick={() => setIsCreate(true)}
				/>
			</div>
			<ul className={cx('Category-List')}>
				<li className={cx('Category-List-Item')}>
					<span
						className={cx('Category-List-Item-Text', {
							'Category-List-Item-Text-Current': topic === undefined,
						})}
						onClick={() => router.push('/')}
					>
						전체보기
					</span>
				</li>

				{categoryList.map((category: ICategoryListTypes) => {
					const { idx, category_name } = category;

					return (
						<CategoryItem
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
				<CreateCategoryContainer handleCloseModal={() => setIsCreate(false)} />
			)}

			{isModify && (
				<ModifyCategoryContainer
					handleCloseModal={() => setIsModify(false)}
					categoryInfo={categoryInfo}
				/>
			)}
		</div>
	);
};

export default Category;
