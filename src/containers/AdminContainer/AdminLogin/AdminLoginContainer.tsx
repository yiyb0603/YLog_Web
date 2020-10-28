import React, { useCallback, useEffect, useState } from 'react';
import { sha512 } from 'js-sha512';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import IErrorTypes from 'interface/ErrorTypes';
import { clearStorage } from 'lib/Storage';
import { NextRouter, useRouter } from 'next/router';
import SecureLS from 'secure-ls';
import axios from 'axios';
import Constants from 'Constants';
import validationSignIn from 'validation/Auth/validationSignIn';
import { ISignInResponseTypes, ISignInTypes } from 'interface/AuthTypes';
import AdminLogin from 'components/Admin/AdminLogin';
import { removeCookie, setCookie } from 'lib/Cookie';

const AdminLoginContainer = observer(() => {
	const router: NextRouter = useRouter();
	const { USER_TOKEN, ADMIN_TOKEN } = Constants;

	const { store } = useStores();
	const { handleSignIn } = store.AuthStore;

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const requestAdminLogin = useCallback(async () => {
		const request: ISignInTypes = {
			email,
			password: sha512(password),
		};

		if (!validationSignIn(request)) {
			return;
		}

		await handleSignIn(request)
			.then(({ status, data }: ISignInResponseTypes) => {
				if (status === 200) {
					if (data.userInfo.is_admin) {
						successToast('관리자 로그인을 성공하였습니다.');
						axios.defaults.headers.cookie = data.ylogToken;
						setCookie("ylog-adminToken", data.ylogToken);
						const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
						ls.set('userInfo', data.userInfo);
						router.push('/admin');
						return;
					}

					errorToast('관리자만 로그인이 가능합니다!');
					return;
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [email, password, handleSignIn]);

	useEffect(() => {
		clearStorage();
		removeCookie(USER_TOKEN);
		removeCookie(ADMIN_TOKEN);
	}, [clearStorage, USER_TOKEN, ADMIN_TOKEN]);

	return (
		<AdminLogin
			emailObject={GroupingState('email', email, setEmail)}
			passwordObject={GroupingState('password', password, setPassword)}
			requestAdminLogin={requestAdminLogin}
		/>
	);
});

export default AdminLoginContainer;
