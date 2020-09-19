import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./HomePost.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomePostProps {}

const HomePost = ({}: HomePostProps) => {
	return (
		<div className={cx('HomePost')}>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
			<div>글이 들어갈 공간</div>
		</div>
	);
};

export default HomePost;
