import { ICategoryListTypes } from "interface/CategoryTypes";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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

	categoryList: ICategoryListTypes[];
	requestThumbnailUpload: (e: ChangeEvent<HTMLInputElement>) => void;
	requestImageUpload: (file: File) => Promise<string>;
	requestWritePost: () => Promise<void>;
}