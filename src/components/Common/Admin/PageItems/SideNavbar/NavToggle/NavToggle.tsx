import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NavToggle.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavToggle = () => {
	return (
		<div className={cx('NavToggle')}>
			<GiHamburgerMenu className={cx('NavToggle-Icon')} />
		</div>
	);
};

export default NavToggle;
