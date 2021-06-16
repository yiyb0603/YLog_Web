import React, { Dispatch, SetStateAction, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';
import { BsPen, BsTrash } from 'react-icons/bs';
import { ICategory } from 'interface/CategoryTypes';
import stringEllipsis from 'lib/util/StringEllipsis';
import getMyInfo from 'lib/util/getMyInfo';
import { IToken } from 'interface/AuthTypes';

const style = require('./CategoryItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CategoryItemProps {
	idx: number;
	categoryName: string;
	post_count: number;
	setCategoryInfo: Dispatch<SetStateAction<ICategory>>;
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
}: CategoryItemProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const { topic, keyword } = useMemo(() => router.query, [router]);

	const myInfo: IToken = useMemo(() => getMyInfo(), [getMyInfo]);

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

			{(myInfo && myInfo.isAdmin) && (
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
