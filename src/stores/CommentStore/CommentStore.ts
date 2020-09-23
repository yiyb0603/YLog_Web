import { autobind } from 'core-decorators';
import {
	ICommentRequestTypes,
	ICommentResponseListTypes,
	ICommentResponseTypes,
} from 'interface/CommentTypes';
import { getResponse, postRequest } from 'lib/Axios';
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
			const response = await postRequest('/comment', request, getToken());
			return response;
		} catch (error) {
			throw error;
		}
	};
}
