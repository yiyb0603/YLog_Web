import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CommentModifyForm from 'components/Common/CommentModifyForm';

interface CommentModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};
	isModify: boolean;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	onBlur: () => void;
	requestCommentModify: () => Promise<void>;
}

const CommentModify = ({
	contentsObject,
	isModify,
	setIsModify,
	onBlur,
	requestCommentModify,
}: CommentModifyProps) => {
	const { contents, setContents } = contentsObject;

	return (
		<>
			<CommentModifyForm
				contents={contents}
				setContents={setContents}
				modifyFunction={requestCommentModify}
				onBlur={onBlur}
				isModify={isModify}
			/>
		</>
	);
};

export default CommentModify;
