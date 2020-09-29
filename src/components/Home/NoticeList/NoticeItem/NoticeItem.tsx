import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoticeItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeItemProps {
	idx: number;
	writer: string;
	contents: string;
}

const NoticeItem = ({ idx, writer, contents }: NoticeItemProps) => {
	return (
		<>
			<div></div>
		</>
	);
};

export default NoticeItem;
