import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NoPosts = () => {
	return (
		<div className={cx('NoPosts')}>
			<div className={cx('NoPosts-Contents')}>😎 게시글이 없습니다. 😎</div>
		</div>
	);
};

export default NoPosts;
