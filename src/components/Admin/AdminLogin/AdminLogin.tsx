import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import AdminInput from 'components/Common/Admin/AdminInput';
import FormButton from 'components/Common/Button/FormButton';
import AdminLoginProps from './AdminLogin.types';

const style = require('./AdminLogin.scss');
const cx: ClassNamesFn = classNames.bind(style);

const AdminLogin = ({
	emailObject,
	passwordObject,
	requestAdminLogin,
}: AdminLoginProps): JSX.Element => {
	const { email, setEmail } = emailObject;
	const { password, setPassword } = passwordObject;

	return (
		<>
			<div className={cx('AdminLogin-Wrapper')}></div>
			<div className={cx('AdminLogin')}>
				<div className={cx('AdminLogin-Title')}>YLog 관리자 로그인</div>
				<div className={cx('AdminLogin-Form')}>
					<AdminInput
						type='email'
						value={email}
						setValue={setEmail}
						label='이메일'
						requestFunction={requestAdminLogin}
					/>
					<AdminInput
						type='password'
						value={password}
						setValue={setPassword}
						label='비밀번호'
						requestFunction={requestAdminLogin}
					/>

					<FormButton
						buttonValue='로그인'
						requestFunction={requestAdminLogin}
					/>
				</div>
			</div>
		</>
	);
};

export default AdminLogin;
