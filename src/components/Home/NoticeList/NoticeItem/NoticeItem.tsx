import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { INoticeRequestTypes } from 'interface/NoticeTypes';
import { NextRouter, useRouter } from 'next/router';

const style = require('./NoticeItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeItemProps {
	itemInfo: INoticeRequestTypes;
	children?: ReactNode;
}

const NoticeItem = ({ itemInfo, children }: NoticeItemProps) => {
	const router: NextRouter = useRouter();

	return (
		<div className={cx('NoticeItem')}>
			<div className={cx('NoticeItem-Contents')}>
				<div className={cx('NoticeItem-Contents-Tag')}>공지사항</div>
				<div className={cx('NoticeItem-Contents-Title')}>{itemInfo.title}</div>
				{children && children}
			</div>

			<div className={cx('NoticeItem-Button')}>
				<button
					className={cx('NoticeItem-Button-WriteButton')}
					onClick={() => router.push('/notice/write')}
				>
					공지사항 작성
				</button>
			</div>
		</div>
	);
};

export default NoticeItem;
