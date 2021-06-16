import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { INotice } from 'interface/NoticeTypes';
import { NextRouter, useRouter } from 'next/router';
import stringEllipsis from 'lib/util/StringEllipsis';

const style = require('./NoticeItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeItemProps {
	itemInfo: INotice;
	children?: ReactNode;
}

const NoticeItem = ({ itemInfo, children }: NoticeItemProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const { idx, title } = useMemo(() => itemInfo, []);

	return (
		<div className={cx('NoticeItem')}>
			<div className={cx('NoticeItem-Contents')}>
				<div
					className={cx('NoticeItem-Contents-Title')}
					onClick={() => router.push(`/notice/${idx}`)}
				>
					{stringEllipsis(title!, 15)}
				</div>
				{children && children}
			</div>
		</div>
	);
};

export default NoticeItem;
