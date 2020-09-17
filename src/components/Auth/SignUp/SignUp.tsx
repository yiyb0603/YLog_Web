import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import FormButton from 'components/Common/FormButton';

const style = require('./SignUp.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignUpProps {}

const SignUp = ({}: SignUpProps) => {
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
					<input type="text" placeholder="아이디를 입력하세요" />
					<input type="text" placeholder="이름을 입력하세요" />
					<input type="email" placeholder="이메일을 입력하세요" />
					<input type="password" placeholder="비밀번호를 입력하세요" />
				</div>

				<div className={cx('SignUp-CheckZone')}>
					<AiOutlineArrowLeft style={{ fontSize: 25, marginRight: 5 }} />
					<div>이미 계정이 있으신가요?</div>
				</div>

				<FormButton buttonValue="회원가입" />
			</FadeIn>
		</div>
	);
};

export default SignUp;
