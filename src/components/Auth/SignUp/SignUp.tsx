import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import FormButton from 'components/Common/FormButton';
import CheckBox from 'components/Common/CheckBox';
import AuthInput from 'components/Common/AuthInput';

const style = require('./SignUp.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignUpProps {
	setPageType: Dispatch<SetStateAction<string>>;
	idObject: {
		id: string;
		setId: Dispatch<SetStateAction<string>>;
	};

	passwordObject: {
		password: string;
		setPassword: Dispatch<SetStateAction<string>>;
	};

	nameObject: {
		name: string;
		setName: Dispatch<SetStateAction<string>>;
	};

	emailObject: {
		email: string;
		setEmail: Dispatch<SetStateAction<string>>;
	};

	adminCodeObject: {
		adminCode: string;
		setAdminCode: Dispatch<SetStateAction<string>>;
	};

	requestEmailAuth: () => Promise<void>;
}

const SignUp = ({
	setPageType,
	idObject,
	passwordObject,
	nameObject,
	emailObject,
	adminCodeObject,
	requestEmailAuth,
}: SignUpProps) => {
	const { id, setId } = idObject;
	const { password, setPassword } = passwordObject;
	const { name, setName } = nameObject;
	const { email, setEmail } = emailObject;
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
						type="text"
						placeholder="아이디를 입력하세요"
						value={id}
						setValue={setId}
					/>

					<AuthInput
						type="text"
						placeholder="이름을 입력하세요"
						value={name}
						setValue={setName}
					/>

					<AuthInput
						type="email"
						placeholder="이메일을 입력하세요"
						value={email}
						setValue={setEmail}
					/>

					<AuthInput
						type="password"
						placeholder="비밀번호를 입력하세요"
						value={password}
						setValue={setPassword}
					/>

					{checkAdmin && (
						<AuthInput
							type="text"
							placeholder="어드민 코드를 입력해주세요"
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

				<FormButton buttonValue="다음으로" requestFunction={requestEmailAuth} />
			</FadeIn>
		</div>
	);
};

export default SignUp;
