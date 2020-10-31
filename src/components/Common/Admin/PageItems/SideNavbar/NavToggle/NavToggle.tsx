import React from 'react';
import { IoMdMenu } from 'react-icons/io';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NavToggle.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavToggle = () => {
	return (
		<div className={cx('NavToggle')}>
			<IoMdMenu className={cx('NavToggle-Icon')} />
		</div>
	);
};

export default NavToggle;
