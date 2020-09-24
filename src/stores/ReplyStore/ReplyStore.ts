import { autobind } from 'core-decorators';
import { IReplyResponseTypes, IReplyTypes } from 'interface/ReplyTypes';
import { getResponse } from 'lib/Axios';
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
}
