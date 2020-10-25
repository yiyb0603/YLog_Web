import React, {
	useCallback,
	useState,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';
import Profile from 'components/Home/Profile';
import Link from 'next/link';
import { getStorage } from 'lib/Storage';
import { getUserToken } from 'Token/Token';
import SearchInput from '../../Input/SearchInput';
import Constants from 'Constants';

const style = require('./NavBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavBar = () => {
	const [isMyInfo, setIsMyInfo] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');

	const { USER_TOKEN } = Constants;
	const router: NextRouter = useRouter();

	const searchQuery = useCallback((): void => {
		if (!keyword) {
			router.push(`/`);
			return;
		}

		router.push(`/?keyword=${keyword}`);
	}, [keyword, router]);

	return (
		<div className={cx('NavBar')}>
			<div className={cx('NavBar-Contents')}>
				<img
					onClick={() => router.push('/')}
					className={cx('NavBar-Contents-Logo')}
					src="/assets/icon/Logo.PNG"
					alt="logo"
				/>

				<SearchInput
					keyword={keyword}
					setKeyword={setKeyword}
					requestFunction={searchQuery}
				/>

				<div className={cx('NavBar-Contents-Right')}>
					<Link href="/sign">
							<div className={cx('NavBar-Contents-Right-LogText')}>
								{getStorage(USER_TOKEN) !== null ? '로그아웃' : '로그인'}
							</div>
					</Link>
					{getUserToken() !== null ? (
						<img
							src="/assets/icon/profile_default.jpg"
							alt="profile"
							onClick={() => setIsMyInfo(true)}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			{isMyInfo && <Profile handleCloseModal={() => setIsMyInfo(false)} />}
		</div>
	);
};

export default NavBar;
