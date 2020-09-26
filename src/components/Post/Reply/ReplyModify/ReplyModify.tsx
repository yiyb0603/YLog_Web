import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { onKeyDown } from 'lib/onKeyDown';
import CommentModifyForm from 'components/Common/CommentModifyForm';

const style = require('./ReplyModify.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReplyModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	requestModifyReply: () => Promise<void>;
	isModify: boolean;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	onBlur: () => void;
}

const ReplyModify = ({
	contentsObject,
	requestModifyReply,
	isModify,
	setIsModify,
	onBlur,
}: ReplyModifyProps) => {
	const { contents, setContents } = contentsObject;

	return (
		<CommentModifyForm
			contents={contents}
			setContents={setContents}
			modifyFunction={requestModifyReply}
			onBlur={onBlur}
			isModify={isModify}
		/>
	);
};

export default ReplyModify;
