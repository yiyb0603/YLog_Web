import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';
import { BsPen, BsTrash } from 'react-icons/bs';
import { IPostCategoryTypes } from 'interface/CategoryTypes';

const style = require('./CategoryItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CategoryItemProps {
	idx: number;
	categoryName: string;
	setCategoryInfo: Dispatch<SetStateAction<IPostCategoryTypes>>;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	requestDeleteCategory: (idx: number) => void;
}

const CategoryItem = ({
	idx,
	categoryName,
	setCategoryInfo,
	setIsModify,
	requestDeleteCategory,
}: CategoryItemProps) => {
	const router: NextRouter = useRouter();
	const { topic } = router.query;

	return (
		<li key={idx} className={cx('Category-List-Item')}>
			<span
				className={cx('Category-List-Item-Text', {
					'Category-List-Item-Text-Current': Number(topic) === idx,
				})}
				onClick={() => router.push(`/?topic=${idx}`)}
			>
				{categoryName.length > 14
					? categoryName.substring(0, 14).concat('...')
					: categoryName}
			</span>

			<div className={cx('Category-List-Item-Icon')}>
				<BsPen
					className={cx('Category-List-Item-Icon-Modify')}
					onClick={() => {
						setCategoryInfo({ idx, categoryName });
						setIsModify(true);
					}}
				/>

				<BsTrash
					className={cx('Category-List-Item-Icon-Delete')}
					onClick={() => requestDeleteCategory(idx)}
				/>
			</div>
		</li>
	);
};

export default CategoryItem;
