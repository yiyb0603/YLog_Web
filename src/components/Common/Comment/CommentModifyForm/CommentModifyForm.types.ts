import { Dispatch, SetStateAction } from "react";

export default interface CommentModifyFormProps {
	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	isPrivateObject: {
		isPrivate: boolean;
		setIsPrivate: Dispatch<SetStateAction<boolean>>;
	};

	modifyFunction: () => Promise<void>;
	onBlur: () => void;
	isModify: boolean;
}