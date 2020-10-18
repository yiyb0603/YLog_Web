import ISuccessTypes from './SuccessTypes';

export interface IPostRequestTypes {
	idx?: number;
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
	writer_idx?: number;
	contents?: string;
	introduction?: string;
	thumbnail?: string | null | undefined;
	writer?: string;
	category_idx?: number;
	comment_length?: number;
	view_count?: number;
	created_at?: Date | string;
	updated_at?: Date | string;
}
