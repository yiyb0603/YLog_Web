import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CheckBox from 'components/Common/CheckBox';
import FadeIn from 'react-fade-in';
import { RiAccountCircleFill } from 'react-icons/ri';
import FormButton from 'components/Common/FormButton';

const style = require('./SignIn.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignInProps {}

const SignIn = ({}: SignInProps) => {
	const [checked, setChecked] = useState<boolean>(false);

	return (
		<div className={cx('SignIn')}>
			<FadeIn>
				<div className={cx('SignIn-Top')}>
					<div className={cx('SignIn-Top-Title')}>로그인</div>
					<div className={cx('SignIn-Top-SubTitle')}>
						로그인을 통하여 더 많은것을 둘러보세요!
					</div>
				</div>

				<div className={cx('SignIn-Form')}>
					<input
						type="text"
						placeholder="아이디를 입력하세요"
						autoComplete={'off'}
					/>
					<input
						type="password"
						placeholder="비밀번호를 입력하세요"
						autoComplete={'off'}
					/>
				</div>

				<div className={cx('SignIn-CheckZone')}>
					<CheckBox checked={checked} setChecked={setChecked}>
						로그인 유지
					</CheckBox>

					<div className={cx('SignIn-CheckZone-CreateAccount')}>
						<RiAccountCircleFill style={{ fontSize: 25, marginRight: 5 }} />
						<div>아직 계정이 없으신가요?</div>
					</div>
				</div>

				<FormButton buttonValue="로그인" />
			</FadeIn>
		</div>
	);
};

export default SignIn;
