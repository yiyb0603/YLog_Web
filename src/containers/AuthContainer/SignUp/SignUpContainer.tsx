import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import SignUp from 'components/Auth/SignUp';
import useStores from 'lib/hooks/useStores';
import { sha512 } from 'js-sha512';
import { ISignUpDto } from 'interface/AuthTypes';
import ISuccess from 'interface/SuccessTypes';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import EmailContainer from '../Email';
import IError from 'interface/ErrorTypes';
import { observer } from 'mobx-react';
import validationSignUp from 'validation/Auth/validationSignUp';

interface ISignUpContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignUpContainer = observer(({ setPageType }: ISignUpContainerProps): JSX.Element => {
	const { store } = useStores();
	const { handleSendCode, handleAdminCheck, handleEmailDuplicate, isLoading } = store.AuthStore;

	const [isEntered, setIsEntered] = useState<boolean>(false);
	const [registerInfo, setRegisterInfo] = useState<ISignUpDto>({});

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [againPassword, setAgainPassword] = useState<string>('');
	const [adminCode, setAdminCode] = useState<string>('');

	const requestEmailAuth = useCallback(async () => {
		const request: ISignUpDto = {
			password: sha512(password),
			name,
			email: email.trim(),
			adminCode: adminCode !== '' ? adminCode : '',
		};

		if (!validationSignUp(request, sha512(againPassword))) {
			return;
		}

		let isError: boolean = false;
		if (adminCode) {
			await handleAdminCheck(adminCode)
			.catch((error: IError) => {
				isError = true;
				
				const { message } = error.response.data;
				errorToast(message);
			});
		}

		if (isError) {
			return;
		}
		
		await handleEmailDuplicate(email)
		.then(async () => {
			await handleSendCode(email)
			.then((response: ISuccess) => {
				if (response.status === 200) {
					successToast('인증코드를 발송하였습니다!');
					setRegisterInfo(request);
					setIsEntered(true);
				}
			})
	
			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		})
			
		.catch((error: IError) => {
			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [name, email, againPassword, password, adminCode, handleAdminCheck, handleEmailDuplicate, handleSendCode, validationSignUp]);

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
