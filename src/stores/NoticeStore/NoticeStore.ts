import { autobind } from 'core-decorators';
import {
	INotceResponseListTypes,
	INoticeRequestTypes,
	INoticeResponseTypes,
} from 'interface/NoticeTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getUserToken } from 'Token/Token';
import { observable, action } from 'mobx';

@autobind
export default class NoticeStore {
	@observable noticeList: INoticeRequestTypes[] = [];
	@observable noticeInfo: INoticeRequestTypes = {};

	@action
	handleNoticeList = async () => {
		try {
			const response: INotceResponseListTypes = await getResponse('/notice');
			this.noticeList = response.data.notices;

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleNoticeView = async (idx: number) => {
		try {
			const response: INoticeResponseTypes = await getResponse(
				`/notice/${idx}`
			);
			this.noticeInfo = response.data.notice;

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCreateNotice = async (request: INoticeRequestTypes) => {
		try {
			const response: ISuccessTypes = await postRequest(
				'/notice',
				request,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleModifyNotice = async (request: INoticeRequestTypes) => {
		try {
			const response: ISuccessTypes = await modifyRequest(
				'/notice',
				request,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleDeleteNotice = async (idx: number) => {
		try {
			const response: ISuccessTypes = await deleteRequest(
				`/notice?idx=${idx}`,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
