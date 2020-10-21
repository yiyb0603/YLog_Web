import React, {
	Dispatch,
	SetStateAction,
} from 'react';
import CommentModifyForm from 'components/Common/Comment/CommentModifyForm';

interface ReplyModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	isPrivateObject: {
		isPrivate: boolean;
		setIsPrivate: Dispatch<SetStateAction<boolean>>;
	};

	requestModifyReply: () => Promise<void>;
	isModify: boolean;
	onBlur: () => void;
}

const ReplyModify = ({
	contentsObject,
	isPrivateObject,
	requestModifyReply,
	isModify,
	onBlur,
}: ReplyModifyProps) => {
	return (
		<CommentModifyForm
			contentsObject ={contentsObject}
			isPrivateObject ={isPrivateObject}
			modifyFunction={requestModifyReply}
			onBlur={onBlur}
			isModify={isModify}
		/>
	);
};

export default ReplyModify;
