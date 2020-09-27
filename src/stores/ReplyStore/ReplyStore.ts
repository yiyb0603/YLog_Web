import { autobind } from 'core-decorators';
import {
	IReplyModifyTypes,
	IReplyResponseTypes,
	IReplyTypes,
} from 'interface/ReplyTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getToken } from 'lib/Token';
import { action, observable } from 'mobx';

@autobind
export default class ReplyStore {
	@observable replyList: IReplyTypes[] = [];

	@action
	handleReplyList = async (postIdx: number) => {
		try {
			this.replyList = [];
			const response: IReplyResponseTypes = await getResponse(
				`/reply?postIdx=${postIdx}`
			);
			this.replyList = response.data.replies;

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCreateReply = async (request: IReplyModifyTypes) => {
		try {
			const response = await postRequest('/reply', request, getToken());
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleModifyReply = async (request: IReplyTypes) => {
		try {
			const response = await modifyRequest('/reply', request, getToken());
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleDeleteReply = async (idx: number) => {
		try {
			const response = await deleteRequest(`/reply?idx=${idx}`, getToken());
			return response;
		} catch (error) {
			throw error;
		}
	};
}
