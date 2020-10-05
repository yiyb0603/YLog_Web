import React, { useCallback, useState } from 'react';
import { sha512 } from 'js-sha512';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { ISignInResponseTypes, ISignInTypes } from 'interface/AuthTypes';
import AdminLogin from 'components/Admin/AdminLogin';
import GroupingState from 'lib/GroupingState';
import { toast } from 'react-toastify';
import IErrorTypes from 'interface/ErrorTypes';
import { setStorage } from 'lib/Storage';

const AdminLoginContainer = observer(() => {
	const { store } = useStores();
	const { handleSignIn } = store.AuthStore;

	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const requestAdminLogin = useCallback(async () => {
		const request: ISignInTypes = {
			id,
			password: sha512(password),
		};

		if (!id.trim() || !password.trim()) {
			toast.error('내용을 모두 입력해주세요!');
			return;
		}

		await handleSignIn(request)
			.then((response: ISignInResponseTypes) => {
				const { status, data } = response;

				if (status === 200) {
					if (data.userInfo.is_admin) {
						toast.success('관리자 로그인을 성공하였습니다.');
						setStorage('ylog-token', response.data.ylogToken);
						return;
					}

					toast.error('관리자만 로그인이 가능합니다!');
					return;
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
	}, [id, password, handleSignIn]);

	return (
		<AdminLogin
			idObject={GroupingState('id', id, setId)}
			passwordObject={GroupingState('password', password, setPassword)}
			requestAdminLogin={requestAdminLogin}
		/>
	);
});

export default AdminLoginContainer;
