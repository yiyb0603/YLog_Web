import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import SignUp from 'components/Auth/SignUp';
import useStores from 'lib/useStores';
import { sha512 } from 'js-sha512';
import { ISignUpTypes } from 'interface/AuthTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import GroupingState from 'lib/GroupingState';
import { handleMomentParse } from 'lib/Moment';
import { toast } from 'react-toastify';
import EmailContainer from '../EmailContainer';

interface ISignUpContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignUpContainer = ({ setPageType }: ISignUpContainerProps) => {
	const { store } = useStores();
	const { handleSendCode } = store.AuthStore;

	const [isEntered, setIsEntered] = useState<boolean>(false);
	const [registerInfo, setRegisterInfo] = useState<ISignUpTypes>({});

	const [id, setId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [adminCode, setAdminCode] = useState<string>('');

	const requestSignUp = useCallback(async () => {
		const request: ISignUpTypes = {
			id,
			password: sha512(password),
			name,
			email,
			adminCode: adminCode !== '' ? adminCode : '',
		};

		if (!id.trim() || !password.trim() || !name.trim() || !email.trim()) {
			toast.warning('빈칸없이 입력해주세요!');
			return;
		}

		await handleSendCode(email).then((response: ISuccessTypes) => {
			if (response.status === 200) {
				toast.success('인증코드를 발송하였습니다!');
				setRegisterInfo(request);
				setIsEntered(true);
			}
		});

		// await handleSignUp(request)
		// 	.then((response: ISuccessTypes) => {
		// 		if (response.status === 200) {
		// 			toast.success('회원가입에 성공하였습니다!');
		// 			setPageType('login');
		// 		}
		// 	})

		// 	.catch((error: IErrorTypes) => {
		// 		const { status, message } = error.response.data;

		// 		switch (status) {
		// 			case 400:
		// 				toast.error('검증 오류입니다.');
		// 				return;

		// 			case 401:
		// 				toast.error('어드민 코드가 올바르지 않습니다.');
		// 				return;

		// 			case 409:
		// 				toast.error('이미 존재하는 유저입니다.');
		// 				return;

		// 			case 500:
		// 				toast.error('서버 오류입니다.');
		// 				return;

		// 			default:
		// 				toast.error(message);
		// 				return;
		// 		}
		// 	});
	}, [id, password, name, email, adminCode, handleSendCode]);

	return (
		<>
			{!isEntered ? (
				<SignUp
					setPageType={setPageType}
					idObject={GroupingState('id', id, setId)}
					passwordObject={GroupingState('password', password, setPassword)}
					nameObject={GroupingState('name', name, setName)}
					emailObject={GroupingState('email', email, setEmail)}
					adminCodeObject={GroupingState('adminCode', adminCode, setAdminCode)}
					requestSignUp={requestSignUp}
				/>
			) : (
				<EmailContainer registerInfo={registerInfo} setPageType={setPageType} />
			)}
		</>
	);
};

export default SignUpContainer;
