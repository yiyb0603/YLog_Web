import React from 'react';
import { HashLoader } from 'react-spinners';
import { Palette } from 'styles/Palette/Palette';
import classNames from 'classnames';
import { css } from '@emotion/core';
import { ClassNamesFn } from 'classnames/types';

const style = require('./HomeLoading.scss');
const cx: ClassNamesFn = classNames.bind(style);

const HomeLoading = () => {
	const { primary } = Palette;

	const override = css`
		opacity: 0.7;
	`;

	return (
		<div className={cx('HomeLoading')}>
			<HashLoader css={override} size={70} color={primary} />
		</div>
	);
};

export default HomeLoading;
