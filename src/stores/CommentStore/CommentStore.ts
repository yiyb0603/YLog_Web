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
import { getToken } from 'lib/Token';
import { observable, action } from 'mobx';

@autobind
export default class CommentStore {
	@observable commentList: ICommentResponseTypes[] = [];

	@action
	handleCommentList = async (postIdx: number) => {
		try {
			const response: ICommentResponseListTypes = await getResponse(
				`/comment?postIdx=${postIdx}`
			);
			this.commentList = response.data.comments;

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
				this.commentList = this.commentList.filter(
					(comment: ICommentResponseTypes) => comment.idx !== idx
				);
			}

			return response;
		} catch (error) {
			throw error;
		}
	};
}
