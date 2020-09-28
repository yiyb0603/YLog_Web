import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostModify.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostModifyProps {
	postModifyForm: JSX.Element;
}

const PostModify = ({ postModifyForm }: PostModifyProps) => {
	return postModifyForm;
};

export default PostModify;
