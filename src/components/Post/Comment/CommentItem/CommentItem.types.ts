import { IReply } from "interface/ReplyTypes";

export default interface CommentItemProps {
	idx: number;
	postIdx: number;
	writer: string;
	writerIdx: number;
	writerProfile: string;
	contents: string;
	createdAt: string | Date;
	updatedAt: string | Date;
	replies: IReply[];
	isPrivate: boolean;
	requestCommentDelete: (idx: number) => Promise<void>;
	requestDeleteReply: (idx: number) => Promise<void>;
	requestCommentList: () => Promise<void>;
}