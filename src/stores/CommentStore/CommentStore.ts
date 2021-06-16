import { autobind } from 'core-decorators';
import {
	IComment,
	ICommentRequestTypes,
	ICommentResponseListTypes,
} from 'interface/CommentTypes';
import ISuccess from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getUserToken } from 'Token';
import { observable, action } from 'mobx';
import ReplyStore from 'stores/ReplyStore';

@autobind
export default class CommentStore {
	@observable commentReplyList: any = [];
	@observable isLoading: boolean = true;

	@action
	handleCommentList = async (postIdx: number) => {
		try {
			this.isLoading = true;
			this.commentReplyList = [];
			const replyStore: ReplyStore = new ReplyStore();
			const { handleReplyList } = replyStore;
			await handleReplyList(postIdx);

			const response: ICommentResponseListTypes = await getResponse(
				`/comment?postIdx=${postIdx}`
			);

			const commentList: IComment[] = response.data.comments;
			for (let i = 0; i < commentList.length; i++) {
				this.commentReplyList = [
					...this.commentReplyList,
					{
						...commentList[i],
						replies: [],
					},
				];
			}

			const replies = [];

			if (replyStore.replyList.length > 0 && this.commentReplyList.length > 0) {
				for (let i: number = 0; i < this.commentReplyList.length; i++) {
					for (let j: number = 0; j < replyStore.replyList.length; j++) {
						const {
							idx
						} = this.commentReplyList[i];

						const { comment } = replyStore.replyList[j];

						if (idx === comment.idx) {
							replies.push({
								idx: replyStore.replyList[j].idx,
								user: replyStore.replyList[j].user,
								contents: replyStore.replyList[j].contents,
								repliedAt: replyStore.replyList[j].repliedAt,
								updatedAt: replyStore.replyList[j].updatedAt,
								commentIdx: replyStore.replyList[j].comment.idx,
								postIdx: replyStore.replyList[j].post.idx,
								isPrivate: replyStore.replyList[j].isPrivate,
							});

							this.commentReplyList[i].replies = replies;
						}
					}
				}
			} else {
				this.commentReplyList = commentList;
			}
			this.isLoading = false;
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentWrite = async (request: ICommentRequestTypes) => {
		try {
			const response: ISuccess = await postRequest(
				'/comment',
				request,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentModify = async (request: ICommentRequestTypes) => {
		try {
			const response: ISuccess = await modifyRequest(
				'/comment',
				request,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentDelete = async (idx: number) => {
		try {
			const response: ISuccess = await deleteRequest(
				`/comment?idx=${idx}`,
				getUserToken()
			);

			return response;
		} catch (error) {
			throw error;
		}
	};
}
