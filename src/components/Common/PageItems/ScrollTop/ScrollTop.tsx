import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BsBoxArrowInUp } from 'react-icons/bs';
import useScrollTop from 'lib/hooks/useScrollTop';

const style = require('./ScrollTop.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ScrollTop = () => {
	const { isTop, scrollToTop } = useScrollTop();

	return (
		<>
			{!isTop && (
				<div className={cx('ScrollTop')} onClick={scrollToTop}>
					<BsBoxArrowInUp className={cx('ScrollTop-Icon')} />
				</div>
			)}
		</>
	);
};

export default ScrollTop;
