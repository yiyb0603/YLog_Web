import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoComments.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NoComments = () => {
	return <div className={cx('NoComments')}>작성된 댓글이 없습니다.</div>;
};

export default NoComments;
