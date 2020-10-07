import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import AdminInput from 'components/Common/Admin/AdminInput';
import FormButton from 'components/Common/FormButton';

const style = require('./AdminLogin.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AdminLoginProps {
	idObject: {
		id: string;
		setId: Dispatch<SetStateAction<string>>;
	};

	passwordObject: {
		password: string;
		setPassword: Dispatch<SetStateAction<string>>;
	};

	requestAdminLogin: () => Promise<void>;
}

const AdminLogin = ({
	idObject,
	passwordObject,
	requestAdminLogin,
}: AdminLoginProps) => {
	const { id, setId } = idObject;
	const { password, setPassword } = passwordObject;

	return (
		<>
			<div className={cx('AdminLogin-Wrapper')}></div>
			<div className={cx('AdminLogin')}>
				<div className={cx('AdminLogin-Title')}>YLog 관리자 로그인</div>
				<div className={cx('AdminLogin-Form')}>
					<AdminInput
						type="text"
						value={id}
						setValue={setId}
						outline="아이디"
						requestFunction={requestAdminLogin}
					/>
					<AdminInput
						type="password"
						value={password}
						setValue={setPassword}
						outline="비밀번호"
						requestFunction={requestAdminLogin}
					/>

					<FormButton
						buttonValue="로그인"
						requestFunction={requestAdminLogin}
					/>
				</div>
			</div>
		</>
	);
};

export default AdminLogin;
