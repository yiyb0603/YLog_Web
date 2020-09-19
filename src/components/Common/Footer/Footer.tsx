import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Footer.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Footer = () => {
	return (
		<div className={cx('Footer')}>
			<div>Copyright @yiyb0603 All right reserved.</div>
		</div>
	);
};

export default Footer;
