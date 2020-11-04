export default interface CommentLayoutProps {
	idx: number;
	writer: string | null;
	writerIdx: number;
	writerProfile: string;
	contents: string;
	postIdx?: number;
	createdAt: string | Date;
	updatedAt: string | Date;
	isPrivate: boolean;
	children?: any;
	deleteFunction: any;
	commentType: number;
	requestCommentList?: () => Promise<void>;
}