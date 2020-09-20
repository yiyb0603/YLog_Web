import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Post.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostProps {}

const Post = ({}: PostProps) => {
	return (
		<>
			<div></div>
		</>
	);
};

export default Post;
