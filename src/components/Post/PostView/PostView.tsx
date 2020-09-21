import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPostListTypes } from 'interface/PostTypes';

const style = require('./PostView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPostViewProps {
	postInfo: IPostListTypes;
}

const PostView = ({ postInfo }: IPostViewProps) => {
	console.log(postInfo);

	return (
		<div className={cx('PostView')}>
			<div>글페이지</div>
		</div>
	);
};

export default PostView;
