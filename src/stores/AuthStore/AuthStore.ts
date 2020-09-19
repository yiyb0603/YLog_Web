import { autobind } from 'core-decorators';
import { ISignInTypes, ISignUpTypes } from 'interface/AuthTypes';
import { postRequest } from 'lib/Axios';
import { action } from 'mobx';

@autobind
class AuthStore {
	@action
	handleSignIn = async (request: ISignInTypes) => {
		try {
			const response = await postRequest('auth/signin', request);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleSignUp = async (request: ISignUpTypes) => {
		try {
			const response = await postRequest('auth/signup', request);
			return response;
		} catch (error) {
			throw error;
		}
	};
}

export default AuthStore;
