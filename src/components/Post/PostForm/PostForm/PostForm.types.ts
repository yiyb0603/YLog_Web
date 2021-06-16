import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { ICategory } from 'interface/CategoryTypes';

export default interface PostWriteFormProps {
	titleObject: {
		title: string;
		setTitle: Dispatch<SetStateAction<string>>;
	};

	thumbnailObject: {
		thumbnail: string;
		setThumbnail: Dispatch<SetStateAction<string>>;
	};

	introductionObject: {
		introduction: string;
		setIntroduction: Dispatch<SetStateAction<string>>;
	};

	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	categoryIdxObject: {
		categoryIdx: number;
		setCategoryIdx: Dispatch<SetStateAction<number>>;
	};

	categoryList: ICategory[];
	requestThumbnailUpload: (e: ChangeEvent<HTMLInputElement>) => void;
	requestImageUpload: (file: File) => Promise<string>;
	requestWritePost: (e: MouseEvent<HTMLButtonElement>) => void;
}