import { autobind } from 'core-decorators';
import {
	ICommentRequestTypes,
	ICommentResponseListTypes,
	ICommentResponseTypes,
} from 'interface/CommentTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getUserToken } from 'Token/Token';
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
			console.log(replyStore.replyList);

			const response: ICommentResponseListTypes = await getResponse(
				`/comment?postIdx=${postIdx}`
			);

			const commentList: ICommentResponseTypes[] = response.data.comments;
			for (let i = 0; i < commentList.length; i++) {
				const {
					idx,
					writer,
					writer_idx,
					writer_profile,
					contents,
					post_idx,
					created_at,
					updated_at,
					is_private,
				} = commentList[i];
				this.commentReplyList = [
					...this.commentReplyList,
					{
						idx,
						writer,
						writer_idx,
						writer_profile,
						contents,
						post_idx,
						created_at,
						updated_at,
						is_private,
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

						const { comment_idx } = replyStore.replyList[j];

						if (idx === comment_idx) {
							replies.push({
								idx: replyStore.replyList[j].idx,
								writer: replyStore.replyList[j].writer,
								writerIdx: replyStore.replyList[j].writer_idx,
								writerProfile: replyStore.replyList[j].writer_profile,
								contents: replyStore.replyList[j].contents,
								repliedAt: replyStore.replyList[j].replied_at,
								updatedAt: replyStore.replyList[j].updated_at,
								commentIdx: replyStore.replyList[j].comment_idx,
								postIdx: replyStore.replyList[j].post_idx,
								isPrivate: replyStore.replyList[j].is_private,
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
			const response: ISuccessTypes = await postRequest(
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
			const response: ISuccessTypes = await modifyRequest(
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
			const response: ISuccessTypes = await deleteRequest(
				`/comment?idx=${idx}`,
				getUserToken()
			);

			return response;
		} catch (error) {
			throw error;
		}
	};
}
