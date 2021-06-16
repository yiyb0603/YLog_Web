import React, { CSSProperties, useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { INotice } from 'interface/NoticeTypes';
import NoticeItem from './NoticeItem';
import { NextRouter, useRouter } from 'next/router';
import isAdmin from 'lib/util/isAdmin';
import WriteButton from 'components/Common/Button/WriteButton';
import { useMemo } from 'react';

const style = require('./NoticeList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeListProps {
	noticeList: INotice[];
	count: number;
	handleIncreaseCount: () => void;
	handleDecreaseCount: () => void;
}

const NoticeList = ({
	noticeList,
	count,
	handleIncreaseCount,
	handleDecreaseCount,
}: NoticeListProps): JSX.Element => {
	const FIVE_SECONDS: number = 5000;
	const router: NextRouter = useRouter();
	const arrowStyle: CSSProperties = useMemo(() => {
		return {
			fontSize: 18,
			cursor: 'pointer',
		};
	}, []);

	useEffect(() => {
		const counter: number = setInterval(handleIncreaseCount, FIVE_SECONDS);

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

			{isAdmin() && (
				<WriteButton nextFunction ={() => router.push('/notice/write')}>
					공지사항 작성
				</WriteButton>
			)}
		</div>
	);
};

export default NoticeList;
