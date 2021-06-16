import { IUser } from './AuthTypes';
import { IPost } from './PostTypes';
import { IReply } from './ReplyTypes';
import ISuccess from './SuccessTypes';

export interface ICommentResponseListTypes extends ISuccess {
	data: {
		comments: IComment[];
	};
}

export interface IComment {
	idx: number;
	contents?: string;
	createdAt?: Date | string;
	post?: IPost;
	updatedAt?: Date | null;
	user?: IUser;
	isPrivate?: boolean;
	replies: IReply[];
}

export interface ICommentDto {
	idx?: number;
	contents: string;
	postIdx: number;
	isPrivate: boolean;
}
