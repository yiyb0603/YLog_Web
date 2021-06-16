import React, { CSSProperties, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SignInContainer from 'containers/AuthContainer/SignIn';
import SignUpContainer from 'containers/AuthContainer/SignUp';
import { clearStorage } from 'lib/Storage';
import Constants from 'Constants';
import { removeCookie } from 'lib/Cookie';
import { NextRouter, useRouter } from 'next/router';

const style = require('./SignTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SignTemplate = () => {
	const router: NextRouter = useRouter();
	const [pageType, setPageType] = useState<string>('login');
	const { USER_TOKEN, ADMIN_TOKEN } = Constants;

	useEffect(() => {
		clearStorage();
		removeCookie(USER_TOKEN);
		removeCookie(ADMIN_TOKEN);
	}, [clearStorage, USER_TOKEN, ADMIN_TOKEN]);

	return (
		<div className={cx('SignTemplate')}>
			<div className={cx('SignTemplate-FormBox')}>
				<div className={cx('SignTemplate-FormBox-LeftPanel')}>
					<div className={cx('SignTemplate-FormBox-LeftPanel-Welcome')}>
						<span
							className ={cx('SignTemplate-FormBox-LeftPanel-Name')}
							title ='블로그 이동'
							onClick={() => router.push('/')}
						>
							YLog
						</span>
						에 오신것을 환영합니다!
					</div>

					{pageType === 'login' ? (
						<SignInContainer setPageType={setPageType} />
					) : (
						<SignUpContainer setPageType={setPageType} />
					)}
				</div>

				<div className={cx('SignTemplate-FormBox-RightPanel')}>
					<img src='/assets/images/Login/Banner.svg' alt='banner' />
				</div>
			</div>
		</div>
	);
};

export default SignTemplate;
