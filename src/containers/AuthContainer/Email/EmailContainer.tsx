import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { IEmailCodeTypes, ISignUpTypes } from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { errorToast, successToast } from 'lib/Toast';
import IErrorTypes from 'interface/ErrorTypes';
import { showAlert } from 'lib/SweetAlert';
import EmailAuth from 'components/Auth/EmailAuth';
import GroupingState from 'lib/util/GroupingState';

interface IEmailContainerProps {
	registerInfo: ISignUpTypes;
	setPageType: Dispatch<SetStateAction<string>>;
}

const EmailContainer = observer(
	({ registerInfo, setPageType }: IEmailContainerProps) => {
		const { store } = useStores();
		const { handleCheckCode, handleSignUp, isLoading } = store.AuthStore;

		const { email } = registerInfo;
		const [code, setCode] = useState<string>('');

		const requestCheckCode = useCallback(async (): Promise<boolean | void> => {
			const request: IEmailCodeTypes = {
				email: email!,
				code,
			};

			if (!code.trim()) {
				errorToast('인증 코드를 입력해주세요!');
				return;
			}

			await handleCheckCode(request)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						return true;
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		}, [handleCheckCode, email, code]);

		const requestSignUp = useCallback(async () => {
			await requestCheckCode().then(async () => {
				await handleSignUp(registerInfo)
					.then((response: ISuccessTypes) => {
						if (response.status === 200) {
							showAlert(
								'회원가입 성공',
								'관리자 승인 후 로그인 가능합니다.',
								'success'
							);
							setPageType('login');
						}
					})

					.catch((error: IErrorTypes) => {
						const { message } = error.response.data;
						errorToast(message);
						return;
					});
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			})
		}, [requestCheckCode, registerInfo]);

		return (
			<EmailAuth
				isLoading={isLoading}
				codeObject={GroupingState('code', code, setCode)}
				requestSignUp={requestSignUp}
			/>
		);
	}
);

export default EmailContainer;
