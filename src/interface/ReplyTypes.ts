import ISuccess from './SuccessTypes';

export interface IReplyResponse extends ISuccess {
	data: {
		replies: IReply[];
	};
}

export interface IReplyModify {
	idx?: number;
	commentIdx: number;
	postIdx: number;
	contents: string;
	isPrivate: boolean;
}

export interface IReply {
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