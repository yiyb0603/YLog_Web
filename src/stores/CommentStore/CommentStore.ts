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
	@action
	handleCommentList = async (postIdx: number) => {
		try {
			let commentReplyList: any = [];

			const replyStore: ReplyStore = new ReplyStore();
			const { handleReplyList } = replyStore;
			await handleReplyList(postIdx);

			const response: ICommentResponseListTypes = await getResponse(
				`/comment?postIdx=${postIdx}`
			);

			const commentList: ICommentResponseTypes[] = response.data.comments;
			const replies = [];
			commentReplyList = commentList;

			if (replyStore.replyList.length > 0 && commentList.length > 0) {
				for (let i: number = 0; i < commentList.length; i++) {
					for (let j: number = 0; j < replyStore.replyList.length; j++) {
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
							replies.push({
								idx: replyStore.replyList[j].idx,
								writer: replyStore.replyList[j].writer,
								contents: replyStore.replyList[j].contents,
								repliedAt: replyStore.replyList[j].replied_at,
								updatedAt: replyStore.replyList[j].updated_at,
								commentIdx: replyStore.replyList[j].comment_idx,
								postIdx: replyStore.replyList[j].post_idx,
							});

							commentReplyList[i].replies = replies;
						}
					}
				}
			}
			return commentReplyList;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCommentWrite = async (request: ICommentRequestTypes) => {
		try {
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

			return response;
		} catch (error) {
			throw error;
		}
	};
}
