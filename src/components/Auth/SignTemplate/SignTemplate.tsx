import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignInContainer from 'containers/AuthContainer/SignIn';
import SignUpContainer from 'containers/AuthContainer/SignUp';

const style = require('./SignTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignTemplateProps {}

const SignTemplate = ({}: SignTemplateProps) => {
	const [pageType, setPageType] = useState<string>('login');

	return (
		<div className={cx('SignTemplate')}>
			<div className={cx('SignTemplate-FormBox')}>
				<div className={cx('SignTemplate-FormBox-LeftPanel')}>
					<div className={cx('SignTemplate-FormBox-LeftPanel-Welcome')}>
						YLog에 오신것을 환영합니다!
					</div>

					{pageType === 'login' ? (
						<SignInContainer setPageType={setPageType} />
					) : (
						<SignUpContainer setPageType={setPageType} />
					)}
				</div>

				<div className={cx('SignTemplate-FormBox-RightPanel')}>
					<img src="https://mk0muwucepum99ape3ia.kinstacdn.com/wp-content/uploads/2019/12/%E2%80%94Pngtree%E2%80%94flat-wind-men-s-business_4575829-400x400.png" />
				</div>
			</div>
		</div>
	);
};

export default SignTemplate;
