import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import AuthInput from 'components/Common/AuthInput';
import FadeIn from 'react-fade-in';
import FormButton from 'components/Common/Button/FormButton';
import { Spinner } from '@class101/ui';

const style = require('./EmailAuth.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface EmailAuthProps {
	isLoading: boolean;

	codeObject: {
		code: string;
		setCode: Dispatch<SetStateAction<string>>;
	};

	requestSignUp: () => Promise<void>;
}

const EmailAuth = ({
	isLoading,
	codeObject,
	requestSignUp,
}: EmailAuthProps) => {
	const { code, setCode } = codeObject;

	return (
		<div className={cx('EmailAuth')}>
			<FadeIn>
				<div className={cx('EmailAuth-Top')}>
					<div className={cx('EmailAuth-Top-Title')}>이메일 인증</div>
					<div className={cx('EmailAuth-Top-SubTitle')}>
						이메일 인증코드를 입력해주세요.
					</div>
				</div>

				<div className={cx('EmailAuth-Form')}>
					<AuthInput
						type='text'
						placeholder='인증코드를 입력하세요'
						value={code}
						setValue={setCode}
					/>
				</div>

				<FormButton
					buttonValue={
						isLoading ? <Spinner size={20} color='white' /> : '회원가입'
					}
					requestFunction={requestSignUp}
				/>
			</FadeIn>
		</div>
	);
};

export default EmailAuth;
