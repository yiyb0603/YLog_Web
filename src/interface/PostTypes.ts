export interface IPostRequestTypes {
	title: string;
	contents: string;
	thumbnail?: string | null;
	categoryIdx: number;
}

export interface IPostResponseTypes {
	status: 200;
	message: string;
	data: {
		posts: IPostListTypes[];
	};
}

export interface IPostListTypes {
	idx: number;
	title: string;
	contents: string;
	thumbnail: string | null;
	category_idx: number;
	created_at: Date | string;
	writer: string;
}
