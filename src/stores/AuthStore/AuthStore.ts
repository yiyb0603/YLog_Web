import { autobind } from 'core-decorators';
import {
	ISignInResponseTypes,
	ISignInTypes,
	ISignUpTypes,
} from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { postRequest } from 'lib/Axios';
import { getToken } from 'lib/Token';
import { action, observable } from 'mobx';

@autobind
export default class AuthStore {
	@observable isLoading = false;

	@action
	handleSignIn = async (request: ISignInTypes) => {
		this.isLoading = true;
		try {
			const response: ISignInResponseTypes = await postRequest(
				'/auth/signin',
				request
			);
			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	};

	@action
	handleSignUp = async (request: ISignUpTypes) => {
		try {
			this.isLoading = true;
			const response: ISuccessTypes = await postRequest(
				'/auth/signup',
				request
			);
			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	};

	@action
	handleFCMToken = async (fcmToken: string) => {
		try {
			const response = await postRequest('/auth/fcm', { fcmToken }, getToken());
			return response;
		} catch (error) {
			throw error;
		}
	};
}
