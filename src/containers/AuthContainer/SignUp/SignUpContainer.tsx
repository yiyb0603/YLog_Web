import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import SignUp from 'components/Auth/SignUp';
import useStores from 'lib/hooks/useStores';
import { sha512 } from 'js-sha512';
import { ISignUpTypes } from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import EmailContainer from '../Email';
import IErrorTypes from 'interface/ErrorTypes';
import { observer } from 'mobx-react';
import validationSignUp from 'validation/Auth/validationSignUp';

interface ISignUpContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignUpContainer = observer(({ setPageType }: ISignUpContainerProps) => {
	const { store } = useStores();
	const { handleSendCode, handleAdminCheck, handleEmailDuplicate, isLoading } = store.AuthStore;

	const [isAdminCheck, setIsAdminCheck] = useState<boolean>(true);
	const [isEntered, setIsEntered] = useState<boolean>(false);
	const [registerInfo, setRegisterInfo] = useState<ISignUpTypes>({});

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [againPassword, setAgainPassword] = useState<string>('');
	const [adminCode, setAdminCode] = useState<string>('');

	const requestEmailAuth = useCallback(async () => {
		const request: ISignUpTypes = {
			password: sha512(password),
			name,
			email: email.trim(),
			adminCode: adminCode !== '' ? adminCode : '',
		};

		if (!validationSignUp(request, sha512(againPassword))) {
			return;
		}

		if (adminCode) {
			await handleAdminCheck(adminCode)
			.catch((error: IErrorTypes) => {
				setIsAdminCheck(false);
				
				const { message } = error.response.data;
				errorToast(message);
				return;
			})
		}
		
		if (isAdminCheck) {
			await handleEmailDuplicate(email)
			.then(async () => {
				await handleSendCode(email)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						successToast('인증코드를 발송하였습니다!');
						setRegisterInfo(request);
						setIsEntered(true);
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
			});
		}
	}, [name, email, againPassword, password, adminCode, isAdminCheck, handleAdminCheck, handleEmailDuplicate, handleSendCode, validationSignUp]);

	return (
		<>
			{!isEntered ? (
				<SignUp
					isLoading={isLoading}
					setPageType={setPageType}
					nameObject={GroupingState('name', name, setName)}
					emailObject={GroupingState('email', email, setEmail)}
					passwordObject={GroupingState('password', password, setPassword)}
					againPasswordObject={GroupingState('againPassword', againPassword, setAgainPassword)}
					adminCodeObject={GroupingState('adminCode', adminCode, setAdminCode)}
					requestEmailAuth={requestEmailAuth}
				/>
			) : (
				<EmailContainer registerInfo={registerInfo} setPageType={setPageType} />
			)}
		</>
	);
});

export default SignUpContainer;
