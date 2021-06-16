import { IUser } from 'interface/AuthTypes';

export default interface CommentLayoutProps {
	idx: number;
	user: IUser;
	contents: string;
	postIdx?: number;
	createdAt: string | Date;
	updatedAt: string | Date;
	isPrivate: boolean;
	children?: any;
	deleteFunction: (idx: number) => Promise<void>;
	commentType: number;
	requestCommentList?: () => Promise<void>;
}