import { autobind } from 'core-decorators';
import {
	IEmailCodeDto,
	ISignInResponseTypes,
	ISignInDto,
	ISignUpDto,
} from 'interface/AuthTypes';
import ISuccess from 'interface/SuccessTypes';
import { postRequest } from 'lib/Axios';
import { getUserToken } from 'Token/Token';
import { action, observable } from 'mobx';

@autobind
export default class AuthStore {
	@observable isLoading = false;

	@action
	// 로그인
	handleSignIn = async (request: ISignInDto) => {
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
	// 이메일 인증 코드 발급
	handleSendCode = async (email: string) => {
		this.isLoading = true;
		try {
			const response: ISuccess = await postRequest('/auth/send', {
				email,
			});
			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	};

	@action
	// 이메일 인증 코드 확인
	handleCheckCode = async (request: IEmailCodeDto) => {
		this.isLoading = true;
		try {
			const response: ISuccess = await postRequest('/auth/check', request);
			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	};

	@action
	// 어드민 코드 체크
	handleAdminCheck = async (adminCode: string) => {
		this.isLoading = true;
		try {
			const response: ISuccess = await postRequest('/auth/check-admin', { adminCode });
			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	@action
	// 이메일 중복 여부 확인
	handleEmailDuplicate = async (email: string) => {
		this.isLoading = true;
		try {
			const response: ISuccess = await postRequest('/auth/duplicate', { email });
			return response;
		} catch (error) {
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	@action
	// 회원가입
	handleSignUp = async (request: ISignUpDto) => {
		this.isLoading = true;
		try {
			const response: ISuccess = await postRequest(
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
	// FCM 토큰 발급
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
