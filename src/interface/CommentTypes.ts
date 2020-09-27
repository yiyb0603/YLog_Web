import ISuccessTypes from './SuccessTypes';

export interface ICommentResponseListTypes extends ISuccessTypes {
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
	idx?: number;
	contents: string;
	postIdx: number;
}
