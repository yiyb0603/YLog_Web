import { autobind } from 'core-decorators';
import {
	ICommentResponseListTypes,
	ICommentResponseTypes,
} from 'interface/CommentTypes';
import { getResponse } from 'lib/Axios';
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
}
