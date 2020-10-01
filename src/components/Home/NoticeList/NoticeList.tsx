import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { INoticeRequestTypes } from 'interface/NoticeTypes';
import NoticeItem from './NoticeItem';
import { NextRouter, useRouter } from 'next/router';

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
	const router: NextRouter = useRouter();

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
		<div className={cx('NoticeList')}>
			<div className={cx('NoticeList-Contents')}>
				<div className={cx('NoticeList-Contents-Tag')}>공지사항</div>
				{noticeList.length > 0 && noticeList[count - 1] ? (
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
				) : (
					<div>공지사항이 없습니다.</div>
				)}
			</div>

			<div className={cx('NoticeList-Button')}>
				<button
					className={cx('NoticeList-Button-WriteButton')}
					onClick={() => router.push('/notice/write')}
				>
					공지사항 작성
				</button>
			</div>
		</div>
	);
};

export default NoticeList;
