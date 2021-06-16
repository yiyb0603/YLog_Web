import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./BlockQuote.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface BlockQuoteProps {
	children: ReactNode;
}

const BlockQuote = ({
	children,
}: BlockQuoteProps): JSX.Element => {
	return <div className={cx('BlockQuote')}>{children}</div>;
};

export default BlockQuote;
