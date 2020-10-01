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
	const { idx, title } = itemInfo;

	return (
		<div className={cx('NoticeItem')}>
			<div className={cx('NoticeItem-Contents')}>
				<div
					className={cx('NoticeItem-Contents-Title')}
					onClick={() => router.push(`/notice/${idx}`)}
				>
					{title}
				</div>
				{children && children}
			</div>
		</div>
	);
};

export default NoticeItem;
