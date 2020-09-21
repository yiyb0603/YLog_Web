export interface IPostRequestTypes {
	title: string;
	introduction: string;
	contents: string;
	thumbnail?: string | null;
	categoryIdx: number;
}

export interface IPostResponseListTypes {
	status: 200;
	message: string;
	data: {
		posts: IPostListTypes[];
	};
}

export interface IPostResponseTypes {
	status: 200;
	message: string;
	data: {
		post: IPostListTypes;
	};
}

export interface IPostListTypes {
	idx?: number;
	title?: string;
	writer_id?: string;
	contents?: string;
	introduction?: string;
	thumbnail?: string | null;
	category_idx?: number;
	created_at?: Date | string;
	writer?: string;
}
