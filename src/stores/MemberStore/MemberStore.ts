import { autobind } from 'core-decorators';
import { IUser } from 'interface/AuthTypes';
import { IMemberResponse } from 'interface/MemberTypes';
import ISuccess from 'interface/SuccessTypes';
import { deleteRequest, getResponse, postRequest } from 'lib/Axios';
import { action, observable } from 'mobx';
import { getAdminToken } from 'Token';

@autobind
export default class MemberStore {
	@observable memberList: IUser[] = [];

	@action
	handleMemberList = async (isAllow: boolean | null) => {
		try {
			const response: IMemberResponse = await getResponse(
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
			const response: ISuccess = await postRequest(
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
			const response: ISuccess = await postRequest(
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
			const response: ISuccess = await deleteRequest(
				`/member/delete?memberId=${memberIdx}`,
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
