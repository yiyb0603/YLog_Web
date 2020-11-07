import React from 'react';
import ContentLoader from 'react-content-loader';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostLoading.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostLoading = () => {
	return (
		<div className={cx('PostLoading')}>
			<ContentLoader
				speed={2}
				viewBox="0 0 400 300"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="0" y="18" rx="2" ry="2" width="140" height="20" />
				<rect x="0" y="45" rx="2" ry="2" width="900" height="10" />
				<rect x="0" y="60" rx="2" ry="2" width="900" height="150" />
				<rect x="0" y="220" rx="2" ry="2" width="900" height="10" />
			</ContentLoader>
		</div>
	);
};

export default PostLoading;
