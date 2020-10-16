import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Constants from 'Constants';
import { NextRouter, useRouter } from 'next/router';

const style = require('./Footer.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Footer = () => {
	const router: NextRouter = useRouter();
	const { FOOTER_TEXT, VERSION } = Constants;

	return (
		<div className={cx('Footer')}>
			<div>{FOOTER_TEXT}</div>
			<div className={cx('Footer-Version')} onClick ={() => router.push('/release')}>현재 버전: {VERSION}</div>
		</div>
	);
};

export default Footer;
