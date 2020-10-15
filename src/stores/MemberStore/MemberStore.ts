import { autobind } from 'core-decorators';
import { IMemberResponseTypes, IMemberTypes } from 'interface/MemberTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { deleteRequest, getResponse, postRequest } from 'lib/Axios';
import { action, observable } from 'mobx';
import { getAdminToken } from 'Token/Token';

@autobind
export default class MemberStore {
	@observable memberList: IMemberTypes[] = [];

	@action
	handleMemberList = async (isAllow: boolean | null) => {
		try {
			const response: IMemberResponseTypes = await getResponse(
				`/member/list?isAllow=${isAllow}`,
				getAdminToken()
			);
			this.memberList = response.data.members;

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleAllowMember = async (memberIdx: number) => {
		try {
			const response: ISuccessTypes = await postRequest(
				'/member/allow',
				{ memberIdx },
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleRefuseMember = async (memberIdx: number) => {
		try {
			const response: ISuccessTypes = await postRequest(
				'/member/refuse',
				{ memberIdx },
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleDeleteMember = async (memberIdx: number) => {
		try {
			const response: ISuccessTypes = await deleteRequest(
				`/member/delete?memberId=${memberIdx}`,
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
