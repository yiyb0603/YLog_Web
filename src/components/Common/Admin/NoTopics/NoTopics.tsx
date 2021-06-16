import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoTopics.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoTopicsProps {
	topic: string;
}

const NoTopics = ({ topic }: NoTopicsProps): JSX.Element => {
	return (
		<div className={cx('NoTopics')}>
			<div>{topic}</div>
		</div>
	);
};

export default NoTopics;
