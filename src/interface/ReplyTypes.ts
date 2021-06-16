import { IUser } from './AuthTypes';
import { IComment } from './CommentTypes';
import { IPost } from './PostTypes';
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
	contents: string;
	idx: number;
	user: IUser;
	post: IPost;
	comment: IComment;
	repliedAt: Date | null;
	updatedAt: Date | null;
	isPrivate: boolean;
}