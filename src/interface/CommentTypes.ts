import ISuccess from './SuccessTypes';

export interface ICommentResponseListTypes extends ISuccess {
	data: {
		comments: ICommentResponseTypes[];
	};
}

export interface ICommentResponseTypes {
	idx?: number;
	contents?: string;
	createdAt?: Date | string;
	post?: number;
	updated_at?: Date | null;
	writer?: string | null;
	writer_idx?: number | null;
	writer_profile?: string | null;
	is_private?: boolean;
}

export interface ICommentRequestTypes {
	idx?: number;
	contents: string;
	postIdx: number;
	isPrivate: boolean;
}
