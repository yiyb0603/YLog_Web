import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PageHeader.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PageHeaderProps {
	title: string;
	description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps): JSX.Element => {
	return (
		<div className={cx('PageHeader')}>
			<div className={cx('PageHeader-Title')}>{title}</div>
			<div className={cx('PageHeader-Description')}>{description}</div>
		</div>
	);
};

export default PageHeader;
