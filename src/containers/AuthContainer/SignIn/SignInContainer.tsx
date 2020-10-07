import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import { sha512 } from 'js-sha512';
import useStores from 'lib/useStores';
import SignIn from 'components/Auth/SignIn';
import { ISignInResponseTypes, ISignInTypes } from 'interface/AuthTypes';
import IErrorTypes from 'interface/ErrorTypes';
import GroupingState from 'lib/GroupingState';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { setStorage } from 'lib/Storage';
import option from '../../../config/firebase.json';
import firebase from 'firebase/app';
import { setUserInfo } from 'lib/SecureLS';

interface ISignInContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignInContainer = observer(({ setPageType }: ISignInContainerProps) => {
	const { store } = useStores();
	const { handleFCMToken, handleSignIn, isLoading } = store.AuthStore;

	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const getFCMToken = useCallback(async () => {
		firebase.initializeApp(option);

		const token = await firebase.messaging().getToken();

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
		const request: ISignInTypes = {
			id,
			password: sha512(password),
		};

		if (!id.trim() || !password.trim()) {
			toast.warning('빈칸없이 입력해주세요!');
			return;
		}

		await handleSignIn(request)
			.then((response: ISignInResponseTypes) => {
				const { status } = response;

				if (status === 200) {
					toast.success('로그인에 성공하였습니다.');
					Router.push('/');
					requestNotificationAllow();

					if (localStorage) {
						setStorage('ylog-token', response.data.ylogToken);
						setUserInfo('userInfo', response.data.userInfo);
					}
				}
			})

			.catch((error: IErrorTypes) => {
				const { status, message } = error.response.data;

				switch (status) {
					case 400:
						toast.error('로그인 검증 오류입니다.');
						return;

					case 401:
						toast.error('아이디 또는 비밀번호가 올바르지 않습니다.');
						return;

					case 500:
						toast.error('서버 오류입니다.');
						return;

					default:
						toast.error(message);
						return;
				}
			});
	}, [handleSignIn, id, password]);

	return (
		<SignIn
			setPageType={setPageType}
			requestSignIn={requestSignIn}
			idObject={GroupingState('id', id, setId)}
			passwordObject={GroupingState('password', password, setPassword)}
			isLoading={isLoading}
		/>
	);
});

export default SignInContainer;
