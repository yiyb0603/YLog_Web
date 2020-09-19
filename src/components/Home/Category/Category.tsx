import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Category.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CategoryProps {}

const Category = ({}: CategoryProps) => {
	return (
		<div className={cx('Category')}>
			<div className={cx('Category-Title')}>메뉴 목록</div>
			<ul className={cx('Category-List')}>
				<li>카테고리1</li>
				<li>카테고리1</li>
				<li>카테고리1</li>
				<li>카테고리1</li>
				<li>카테고리1</li>
			</ul>
		</div>
	);
};

export default Category;
