import { autobind } from 'core-decorators';
import {
	ICommentRequestTypes,
	ICommentResponseListTypes,
	ICommentResponseTypes,
} from 'interface/CommentTypes';
import { ICommentReplyTypes } from 'interface/ReplyTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getToken } from 'lib/Token';
import { observable, action } from 'mobx';
import ReplyStore from 'stores/ReplyStore';

@autobind
export default class CommentStore {
	@observable commentReplyList: any[] = [];

	@action
	handleCommentList = async (postIdx: number) => {
		try {
			this.commentReplyList = [];

			const replyStore: ReplyStore = new ReplyStore();
			const { handleReplyList } = replyStore;
			await handleReplyList(postIdx);

			const response: ICommentResponseListTypes = await getResponse(
				`/comment?postIdx=${postIdx}`
			);
			const commentList: ICommentResponseTypes[] = response.data.comments;
			this.commentReplyList = commentList;

			if (replyStore.replyList.length > 0 && commentList.length > 0) {
				for (let i = 0; i < commentList.length; i++) {
					for (let j = 0; j < replyStore.replyList.length; j++) {
						const {
							idx,
							writer,
							contents,
							created_at,
							updated_at,
							post_idx,
						} = commentList[i];
						const { comment_idx } = replyStore.replyList[j];

						if (idx === comment_idx) {
							this.commentReplyList = [
								...this.commentReplyList,
								{
									idx,
									writer,
									contents,
									createdAt: created_at,
									updatedAt: updated_at,
									postIdx: post_idx,
									replies: [
										{
											idx: replyStore.replyList[j].idx,
											writer: replyStore.replyList[j].writer,
											contents: replyStore.replyList[j].contents,
											repliedAt: replyStore.replyList[j].replied_at,
											updatedAt: replyStore.replyList[j].updated_at,
											commentIdx: replyStore.replyList[j].comment_idx,
											postIdx: replyStore.replyList[j].post_idx,
										},
									],
								},
							];
						} else {
							this.commentReplyList = [
								...this.commentReplyList,
								{
									idx,
									writer,
									contents,
									createdAt: created_at,
									updatedAt: updated_at,
									postIdx: post_idx,
									replies: [],
								},
							];
						}
					}
				}
			}

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentWrite = async (request: ICommentRequestTypes) => {
		try {
			console.log(getToken());
			const response: ISuccessTypes = await postRequest(
				'/comment',
				request,
				getToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentModify = async (request: ICommentRequestTypes) => {
		try {
			const response: ISuccessTypes = await modifyRequest(
				'/comment',
				request,
				getToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentDelete = async (idx: number) => {
		try {
			const response: ISuccessTypes = await deleteRequest(
				`/comment?idx=${idx}`,
				getToken()
			);
			if (response.status === 200) {
				// this.commentList = this.commentList.filter(
				// 	(comment: ICommentResponseTypes) => comment.idx !== idx
				// );
			}

			return response;
		} catch (error) {
			throw error;
		}
	};
}
