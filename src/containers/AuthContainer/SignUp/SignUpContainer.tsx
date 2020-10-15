import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import SignUp from 'components/Auth/SignUp';
import useStores from 'lib/hooks/useStores';
import { sha512 } from 'js-sha512';
import { ISignUpTypes } from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import GroupingState from 'lib/util/GroupingState';
import { toast } from 'react-toastify';
import EmailContainer from '../Email';
import IErrorTypes from 'interface/ErrorTypes';
import { observer } from 'mobx-react';

interface ISignUpContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignUpContainer = observer(({ setPageType }: ISignUpContainerProps) => {
	const { store } = useStores();
	const { handleSendCode, handleAdminCheck, handleEmailDuplicate, isLoading } = store.AuthStore;

	const [isAdminCheck, setIsAdminCheck] = useState<boolean>(true);
	const [isEntered, setIsEntered] = useState<boolean>(false);
	const [registerInfo, setRegisterInfo] = useState<ISignUpTypes>({});

	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [adminCode, setAdminCode] = useState<string>('');

	const requestEmailAuth = useCallback(async () => {
		const request: ISignUpTypes = {
			password: sha512(password),
			name,
			email: email.trim(),
			adminCode: adminCode !== '' ? adminCode : '',
		};

		if (!password.trim() || !name.trim() || !email.trim()) {
			toast.warning('빈칸없이 입력해주세요!');
			return;
		}

		if (adminCode) {
			await handleAdminCheck(adminCode)
			.catch((error: IErrorTypes) => {
				setIsAdminCheck(false);
				
				const { message } = error.response.data;
				toast.error(message);
				return;
			})
		}
		
		if (isAdminCheck) {
			await handleEmailDuplicate(email)
			.then(async () => {
				await handleSendCode(email)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('인증코드를 발송하였습니다!');
						setRegisterInfo(request);
						setIsEntered(true);
					}
				})
	
				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
			})
			
			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
		}
		
	}, [password, name, email, adminCode, isAdminCheck, handleAdminCheck, handleEmailDuplicate, handleSendCode]);

	return (
		<>
			{!isEntered ? (
				<SignUp
					isLoading={isLoading}
					setPageType={setPageType}
					passwordObject={GroupingState('password', password, setPassword)}
					nameObject={GroupingState('name', name, setName)}
					emailObject={GroupingState('email', email, setEmail)}
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
