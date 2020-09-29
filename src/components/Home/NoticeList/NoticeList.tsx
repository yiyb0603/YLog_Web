import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { INoticeRequestTypes } from 'interface/NoticeTypes';

const style = require('./NoticeList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeListProps {
	noticeList: INoticeRequestTypes[];
}

const NoticeList = ({ noticeList }: NoticeListProps) => {
	console.log(noticeList);

	return (
		<>
			<div></div>
		</>
	);
};

export default NoticeList;
