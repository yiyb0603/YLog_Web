import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import { sha512 } from 'js-sha512';
import useStores from 'lib/hooks/useStores';
import SignIn from 'components/Auth/SignIn';
import { ISignInResponse, ISignInDto } from 'interface/AuthTypes';
import IError from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import Router from 'next/router';
import SecureLS from 'secure-ls';
import Constants from 'Constants';
import { setCookie } from 'lib/Cookie';
import validationSignIn from 'validation/Auth/validationSignIn';
import option from '../../../config/firebase.json';
import * as firebase from 'firebase/app';
import '@firebase/messaging';

interface ISignInContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignInContainer = observer(({ setPageType }: ISignInContainerProps): JSX.Element => {
	const { store } = useStores();
	const { handleFCMToken, handleSignIn, isLoading } = store.AuthStore;
	const { USER_TOKEN } = Constants;

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const getFCMToken = useCallback(async () => {
		if (!firebase.apps.length) {
			firebase.initializeApp(option);
		}

		const token: string = await firebase.messaging().getToken();

		handleFCMToken(token);
	}, [handleFCMToken]);

	const requestNotificationAllow = () => {
		Notification.requestPermission().then(
			(permission: NotificationPermission) => {
				if (permission === 'granted') {
					getFCMToken();
				}
			}
		);
	};

	const requestSignIn = useCallback(async () => {
		const request: ISignInDto = {
			email,
			password: sha512(password),
		};

		if (!validationSignIn(request)) {
			return;
		}

		await handleSignIn(request)
			.then((response: ISignInResponse) => {
				console.log(response);
				const { status, data } = response;

				if (status === 200) {
					if (data.userInfo.isAllow) {
						successToast('로그인에 성공하였습니다.');
						Router.push('/');
						requestNotificationAllow();

						if (localStorage) {
							setCookie(USER_TOKEN, data.ylogToken);
							const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
							ls.set('userInfo', data.userInfo);
						}
						return;
					}

					errorToast('현재 승인되지 않은 유저입니다.');
					return;
				}
			})

			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [handleSignIn, email, password, validationSignIn]);

	return (
		<SignIn
			setPageType={setPageType}
			requestSignIn={requestSignIn}
			emailObject={GroupingState('email', email, setEmail)}
			passwordObject={GroupingState('password', password, setPassword)}
			isLoading={isLoading}
		/>
	);
});

export default SignInContainer;
