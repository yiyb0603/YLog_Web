import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';
import { BsPen, BsTrash } from 'react-icons/bs';
import { IPostCategoryTypes } from 'interface/CategoryTypes';
import stringEllipsis from 'lib/util/StringEllipsis';
import getMyInfo from 'lib/util/getMyInfo';
import { IMemberTypes } from 'interface/MemberTypes';

const style = require('./CategoryItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CategoryItemProps {
	idx: number;
	categoryName: string;
	post_count: number;
	setCategoryInfo: Dispatch<SetStateAction<IPostCategoryTypes>>;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	requestDeleteCategory: (idx: number) => void;
}

const CategoryItem = ({
	idx,
	categoryName,
	post_count,
	setCategoryInfo,
	setIsModify,
	requestDeleteCategory,
}: CategoryItemProps) => {
	const router: NextRouter = useRouter();
	const { topic, keyword } = router.query;

	const myInfo: IMemberTypes = getMyInfo();
	let isAdmin: null | boolean = myInfo ? myInfo.is_admin : null;

	return (
		<li className={cx('CategoryItem')}>
			<div className={cx('CategoryItem-Left')}>
				<div
					className={cx('CategoryItem-Left-Text', {
						'Category-List-Item-Text-Current': Number(topic) === idx,
					})}
					onClick={() =>
						router.push(
							keyword ? `/?topic=${idx}&keyword=${keyword}` : `/?topic=${idx}`
						)
					}
				>
					{stringEllipsis(categoryName, 14)}
				</div>
				<div className={cx('CategoryItem-Left-Count')}>({post_count})</div>
			</div>

			{isAdmin && (
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
			)}
		</li>
	);
};

export default CategoryItem;
