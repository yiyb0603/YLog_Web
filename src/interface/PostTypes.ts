import ISuccessTypes from './SuccessTypes';

export interface IPostRequestTypes {
	title: string;
	introduction: string;
	contents: string;
	thumbnail?: string | null;
	categoryIdx: number;
}

export interface IPostResponseListTypes extends ISuccessTypes {
	data: {
		posts: IPostListTypes[];
	};
}

export interface IPostResponseTypes extends ISuccessTypes {
	data: {
		post: IPostListTypes;
	};
}

export interface IPostListTypes {
	idx?: number;
	title?: string;
	writer_id?: string;
	comment_length?: number;
	contents?: string;
	introduction?: string;
	thumbnail?: string | null | undefined;
	category_idx?: number;
	created_at?: Date | string;
	writer?: string;
}
