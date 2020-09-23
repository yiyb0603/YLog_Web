export interface ICommentResponseListTypes {
	status: number;
	message: string;
	data: {
		comments: ICommentResponseTypes[];
	};
}

export interface ICommentResponseTypes {
	idx?: number;
	contents?: string;
	created_at?: Date | string;
	post_idx?: number;
	updated_at?: Date | null;
	writer?: string | null;
}

export interface ICommentRequestTypes {
	contents: string;
	postIdx: number;
}
