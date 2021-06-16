import React, { CSSProperties, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BsPencil } from 'react-icons/bs';
import CreateCategoryContainer from 'containers/CategoryContainer/CreateCategory/CreateCategoryContainer';
import { ICategory } from 'interface/CategoryTypes';
import { NextRouter, useRouter } from 'next/router';
import ModifyCategoryContainer from 'containers/CategoryContainer/ModifyCategory/ModifyCategoryContainer';
import CategoryItem from './CategoryItem';
import RowCategoryItem from './RowCategoryItem';
import isAdmin from 'lib/util/isAdmin';
import { useMemo } from 'react';

const style = require('./Category.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CategoryProps {
	categoryList: ICategory[];
	requestDeleteCategory: (idx: number) => Promise<void>;
	postLength: number;
}

const Category = ({
	categoryList,
	requestDeleteCategory,
	postLength,
}: CategoryProps): JSX.Element => {
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [isModify, setIsModify] = useState<boolean>(false);
	const [categoryInfo, setCategoryInfo] = useState<ICategory>({});

	const router: NextRouter = useRouter();
	const { query: { topic, keyword, isTemp } }: NextRouter = useMemo(() => router, [router]);

	const fixStyle: CSSProperties = {
		position: postLength > 0 ? 'fixed' : 'relative',
	};

	return (
		<div className={cx('Category')} style={fixStyle}>
			<div className ={cx('Category-RowWrapper')}>
				<div
					className ={cx('RowCategoryItem', {
      			'RowCategoryItem-Current': !topic
    			})}
					onClick={() => router.push('/')}
				>
					전체보기
				</div>

				{
					categoryList.map((category: ICategory) => {
						const { idx, categoryName, postCount } = category;

						return (
							<RowCategoryItem
								key={idx}
								idx={idx!}
								categoryName={categoryName!}
								postCount={postCount!}
								setCategoryInfo={setCategoryInfo}
								setIsModify={setIsModify}
								requestDeleteCategory={requestDeleteCategory}
							/>
						);
					})
				}
			</div>

			<div className ={cx('Category-ColumnWrapper')}>
				<div className={cx('Category-Title')}>
					<div>메뉴 목록</div>
					{isAdmin() && (
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
								'Category-List-Item-Text-Current': !topic && !isTemp,
							})}
							onClick={() =>
								router.push(keyword ? `/?keyword=${keyword}` : `/`)
							}
						>
							전체보기
						</span>
					</li>

					{categoryList.map((category: ICategory) => {
						const { idx, categoryName, postCount } = category;

						return (
							<CategoryItem
								key={idx}
								idx={idx!}
								categoryName={categoryName!}
								post_count={postCount!}
								setCategoryInfo={setCategoryInfo}
								setIsModify={setIsModify}
								requestDeleteCategory={requestDeleteCategory}
							/>
						);
					})}

					{
						isAdmin() &&
						<li className={cx('Category-List-Item')}>
							<span
								className={cx('Category-List-Item-Text', {
									'Category-List-Item-Text-Current': isTemp,
								})}

								onClick={() => router.push(`/?isTemp=true`)}
							>
								임시저장
							</span>
						</li>
					}
				</ul>
			</div>

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
};

export default Category;
