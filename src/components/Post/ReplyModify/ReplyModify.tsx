import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./ReplyModify.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	requestModifyReply: () => Promise<void>;
}

const ReplyModify = ({ contentsObject }: ReplyModifyProps) => {
	const { contents, setContents } = contentsObject;

	return (
		<div className={cx('ReplyModify')}>
			<input type="text" placeholder="답글을 수정하세요" />
		</div>
	);
};

export default ReplyModify;
