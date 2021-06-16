import React, { Dispatch, SetStateAction } from 'react';
import CommentModifyForm from 'components/Common/Comment/CommentModifyForm';

interface CommentModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	isPrivateObject: {
		isPrivate: boolean;
		setIsPrivate: Dispatch<SetStateAction<boolean>>;
	};

	isModify: boolean;
	onBlur: () => void;
	requestCommentModify: () => Promise<void>;
}

const CommentModify = ({
	contentsObject,
	isPrivateObject,
	isModify,
	onBlur,
	requestCommentModify,
}: CommentModifyProps): JSX.Element => {
	

	return (
		<>
			<CommentModifyForm
				contentsObject ={contentsObject}
				isPrivateObject={isPrivateObject}
				modifyFunction={requestCommentModify}
				onBlur={onBlur}
				isModify={isModify}
			/>
		</>
	);
};

export default CommentModify;
