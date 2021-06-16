import { Dispatch, SetStateAction } from 'react';

export default interface NoticeFormProps {
	titleObject: {
		title: string;
		setTitle: Dispatch<SetStateAction<string>>;
	};

	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	requestFunction: () => void;
}