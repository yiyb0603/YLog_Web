import ISuccessTypes from './SuccessTypes';

export interface IReplyResponseTypes extends ISuccessTypes {
	data: {
		replies: IReplyTypes[];
	};
}

export interface IReplyModifyTypes {
	idx?: number;
	commentIdx: number;
	postIdx: number;
	contents: string;
	isPrivate: boolean;
}

export interface IReplyTypes {
	comment_idx: number;
	contents: string;
	idx: number;
	writer: string | null;
	writer_idx: number | null;
	writer_profile: string | null;
	post_idx: number;
	replied_at: Date | null;
	updated_at: Date | null;
	is_private: boolean;
}

export interface ICommentReplyTypes {
	idx: number;
	writer: string | null;
	contents: string;
	createdAt: Date | null;
	updatedAt: Date | null;
	postIdx: number;

	replies?: [
		{
			idx?: number;
			writer?: string;
			contents?: string;
			repliedAt?: Date | null;
			updatedAt?: Date | null;
			commentIdx?: number;
			postIdx?: number;
		}
	];
}
