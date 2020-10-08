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
import SecureLS from 'secure-ls';

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
				const { status, data } = response;

				if (status === 200) {
					if (data.userInfo.is_allow) {
						toast.success('로그인에 성공하였습니다.');
						Router.push('/');
						requestNotificationAllow();

						if (localStorage) {
							setStorage('ylog-token', response.data.ylogToken);
							const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
							ls.set('userInfo', response.data.userInfo);
						}
						return;
					}

					toast.error('현재 승인되지 않은 유저입니다.');
					return;
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
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
