import { autobind } from 'core-decorators';
import { deleteRequest, getResponse, postRequest } from 'lib/Axios';
import { action } from 'mobx';
import { getAdminToken } from 'Token/Token';

@autobind
export default class MemberStore {
	@action
	handleMemberList = async (isAllow: boolean | null) => {
		try {
			const response = await getResponse('/member/list', getAdminToken());
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleAllowMember = async (memberId: string) => {
		try {
			const response = await postRequest(
				'/member/allow',
				{ memberId },
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleRefuseMember = async (memberId: string) => {
		try {
			const response = await postRequest(
				'/member/refuse',
				{ memberId },
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleDeleteMember = async (memberId: string) => {
		try {
			const response = await deleteRequest(
				`/member/delete?memberId=${memberId}`,
				getAdminToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
