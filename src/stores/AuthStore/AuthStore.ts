import { autobind } from 'core-decorators';
import { ISignInTypes } from 'interface/AuthTypes';
import { postRequest } from 'lib/Axios';
import { action } from 'mobx';

@autobind
class AuthStore {
	@action
	handleSignIn = async (request: ISignInTypes) => {
		try {
			const response = await postRequest('auth/signin', request);
			console.log(response);
			return response;
		} catch (error) {
			return error;
		}
	};
}

export default AuthStore;
