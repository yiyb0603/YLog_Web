import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SignInContainer from 'containers/AuthContainer/SignIn';
import SignUpContainer from 'containers/AuthContainer/SignUp';
import { clearStorage } from 'lib/Storage';

const style = require('./SignTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignTemplateProps {}

const SignTemplate = ({}: SignTemplateProps) => {
	const [pageType, setPageType] = useState<string>('login');

	useEffect(() => {
		clearStorage();
	}, [clearStorage]);

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
					<img src="/assets/images/Login/Banner.svg" alt="banner" />
				</div>
			</div>
		</div>
	);
};

export default SignTemplate;
