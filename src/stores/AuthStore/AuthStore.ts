import { autobind } from 'core-decorators';
import {
	ISignInResponseTypes,
	ISignInTypes,
	ISignUpTypes,
} from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { postRequest } from 'lib/Axios';
import { action } from 'mobx';

@autobind
export default class AuthStore {
	@action
	handleSignIn = async (request: ISignInTypes) => {
		try {
			const response: ISignInResponseTypes = await postRequest(
				'auth/signin',
				request
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleSignUp = async (request: ISignUpTypes) => {
		try {
			const response: ISuccessTypes = await postRequest('auth/signup', request);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
