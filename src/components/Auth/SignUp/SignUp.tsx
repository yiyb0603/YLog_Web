import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import { Spinner } from '@class101/ui';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import FormButton from 'components/Common/Button/FormButton';
import CheckBox from 'components/Common/CheckBox';
import AuthInput from 'components/Common/AuthInput';
import SignUpProps from './SignUp.types';

const style = require('./SignUp.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SignUp = ({
	isLoading,
	setPageType,
	nameObject,
	emailObject,
	passwordObject,
	againPasswordObject,
	adminCodeObject,
	requestEmailAuth,
}: SignUpProps) => {
	const { name, setName } = nameObject;
	const { email, setEmail } = emailObject;
	const { password, setPassword } = passwordObject;
	const { againPassword, setAgainPassword } = againPasswordObject;
	const { adminCode, setAdminCode } = adminCodeObject;

	const [checkAdmin, setCheckAdmin] = useState<boolean>(false);

	return (
		<div className={cx('SignUp')}>
			<FadeIn>
				<div className={cx('SignUp-Top')}>
					<div className={cx('SignUp-Top-Title')}>회원가입</div>
					<div className={cx('SignUp-Top-SubTitle')}>
						회원가입으로 YLog의 회원이 되어보세요!
					</div>
				</div>

				<div className={cx('SignUp-Form')}>
					<AuthInput
						type='text'
						placeholder='이름을 입력하세요'
						value={name}
						setValue={setName}
					/>

					<AuthInput
						type='email'
						placeholder='이메일을 입력하세요'
						value={email}
						setValue={setEmail}
					/>

					<AuthInput
						type='password'
						placeholder='비밀번호를 입력하세요'
						value={password}
						setValue={setPassword}
					/>

					<AuthInput
						type='password'
						placeholder ='비밀번호를 재입력 해주세요.'
						value ={againPassword}
						setValue={setAgainPassword}
					/>

					{checkAdmin && (
						<AuthInput
							type='text'
							placeholder='어드민 코드를 입력해주세요'
							value={adminCode}
							setValue={setAdminCode}
						/>
					)}
				</div>

				<div className={cx('SignUp-CheckZone')}>
					<div
						className={cx('SignUp-CheckZone-Account')}
						onClick={() => setPageType('login')}
					>
						<AiOutlineArrowLeft style={{ fontSize: 25, marginRight: 5 }} />
						<div>이미 계정이 있으신가요?</div>
					</div>

					<div>
						<CheckBox checked={checkAdmin} setChecked={setCheckAdmin}>
							어드민 입니다
						</CheckBox>
					</div>
				</div>

				<FormButton
					buttonValue={
						isLoading ? <Spinner size={20} color='white' /> : '다음으로'
					}
					requestFunction={requestEmailAuth}
				/>
			</FadeIn>
		</div>
	);
};

export default SignUp;
