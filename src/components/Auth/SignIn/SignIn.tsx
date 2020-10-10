import React, {
	ChangeEvent,
	Dispatch,
	KeyboardEvent,
	SetStateAction,
	useState,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CheckBox from 'components/Common/CheckBox';
import FadeIn from 'react-fade-in';
import { RiAccountCircleFill } from 'react-icons/ri';
import { Spinner } from '@class101/ui';
import FormButton from 'components/Common/FormButton';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import AuthInput from 'components/Common/AuthInput';

const style = require('./SignIn.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignInProps {
	setPageType: Dispatch<SetStateAction<string>>;
	requestSignIn: () => Promise<void>;
	isLoading: boolean;

	idObject: {
		id: string;
		setId: Dispatch<SetStateAction<string>>;
	};

	passwordObject: {
		password: string;
		setPassword: Dispatch<SetStateAction<string>>;
	};
}

const SignIn = ({
	setPageType,
	requestSignIn,
	isLoading,
	idObject,
	passwordObject,
}: SignInProps) => {
	const { id, setId } = idObject;
	const { password, setPassword } = passwordObject;

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
					<AuthInput
						type="text"
						placeholder="아이디를 입력하세요"
						value={id}
						setValue={setId}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
							useKeyDown(e, requestSignIn)
						}
					/>

					<AuthInput
						type="password"
						placeholder="비밀번호를 입력하세요"
						value={password}
						setValue={setPassword}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
							useKeyDown(e, requestSignIn)
						}
					/>
				</div>

				<div className={cx('SignIn-CheckZone')}>
					<CheckBox checked={checked} setChecked={setChecked}>
						로그인 유지
					</CheckBox>

					<div
						className={cx('SignIn-CheckZone-CreateAccount')}
						onClick={() => setPageType('register')}
					>
						<RiAccountCircleFill style={{ fontSize: 25, marginRight: 5 }} />
						<div>아직 계정이 없으신가요?</div>
					</div>
				</div>

				<FormButton
					buttonValue={
						isLoading ? <Spinner size={20} color="white" /> : '로그인'
					}
					requestFunction={requestSignIn}
				/>
			</FadeIn>
		</div>
	);
};

export default SignIn;
