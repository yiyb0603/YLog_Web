import { autobind } from 'core-decorators';
import {
	IEmailCodeTypes,
	ISignInResponseTypes,
	ISignInTypes,
	ISignUpTypes,
} from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { postRequest } from 'lib/Axios';
import { getUserToken } from 'Token/Token';
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
	handleSendCode = async (email: string) => {
		try {
			const response: ISuccessTypes = await postRequest('/auth/send', {
				email,
			});
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCheckCode = async (request: IEmailCodeTypes) => {
		try {
			const response: ISuccessTypes = await postRequest('/auth/check', request);
			return response;
		} catch (error) {
			throw error;
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
			const response = await postRequest(
				'/auth/fcm',
				{ fcmToken },
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
