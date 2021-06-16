import { autobind } from 'core-decorators';
import {
	INotceResponseListTypes,
	INotice,
	INoticeResponseTypes,
} from 'interface/NoticeTypes';
import ISuccess from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getUserToken } from 'Token';
import { observable, action } from 'mobx';

@autobind
export default class NoticeStore {
	@observable noticeList: INotice[] = [];
	@observable noticeInfo: INotice = {};
	@observable isLoading: boolean = true;

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
		this.isLoading = true;
		try {
			const response: INoticeResponseTypes = await getResponse(
				`/notice/${idx}`
			);
			this.noticeInfo = response.data.notice;

			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	};

	@action
	handleCreateNotice = async (request: INotice) => {
		try {
			const response: ISuccess = await postRequest(
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
	handleModifyNotice = async (request: INotice) => {
		try {
			const response: ISuccess = await modifyRequest(
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
			const response: ISuccess = await deleteRequest(
				`/notice?idx=${idx}`,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
