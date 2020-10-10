import React, {
	Dispatch,
	SetStateAction,
} from 'react';
import CommentModifyForm from 'components/Common/CommentModifyForm';

interface ReplyModifyProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	requestModifyReply: () => Promise<void>;
	isModify: boolean;
	onBlur: () => void;
}

const ReplyModify = ({
	contentsObject,
	requestModifyReply,
	isModify,
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
