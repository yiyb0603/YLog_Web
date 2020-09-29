import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { INoticeRequestTypes } from 'interface/NoticeTypes';
import NoticeItem from './NoticeItem';

const style = require('./NoticeList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeListProps {
	noticeList: INoticeRequestTypes[];
	count: number;
	handleIncreaseCount: () => void;
	handleDecreaseCount: () => void;
}

const NoticeList = ({
	noticeList,
	count,
	handleIncreaseCount,
	handleDecreaseCount,
}: NoticeListProps) => {
	const arrowStyle: CSSProperties = {
		fontSize: 18,
		cursor: 'pointer',
	};

	useEffect(() => {
		const counter: NodeJS.Timeout = setInterval(handleIncreaseCount, 5000);

		return () => {
			clearInterval(counter);
		};
	}, [handleIncreaseCount]);

	return (
		<>
			{noticeList[count - 1] && (
				<NoticeItem itemInfo={noticeList[count - 1] && noticeList[count - 1]}>
					<div className={cx('NoticeList-CountWrapper')}>
						<MdKeyboardArrowLeft
							style={arrowStyle}
							onClick={handleDecreaseCount}
						/>
						<div>
							{count} / {noticeList.length}
						</div>
						<MdKeyboardArrowRight
							style={arrowStyle}
							onClick={handleIncreaseCount}
						/>
					</div>
				</NoticeItem>
			)}
		</>
	);
};

export default NoticeList;
