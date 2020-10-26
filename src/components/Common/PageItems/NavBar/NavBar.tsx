import React, {
	useCallback,
	useState,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { getUserToken } from 'Token/Token';
import SearchInput from '../../Input/SearchInput';
import ProfileContainer from 'containers/ProfileContainer/ProfileContainer';
import getMyInfo from 'lib/util/getMyInfo';

const style = require('./NavBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavBar = () => {
	const [isMyInfo, setIsMyInfo] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const { profile_image } = getMyInfo();

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
								{getUserToken() ? '로그아웃' : '로그인'}
							</div>
					</Link>
					{getUserToken() ? (
						<img
							src={profile_image ? profile_image : '/assets/icon/profile_default.jpg'}
							alt="profile"
							onClick={() => setIsMyInfo(true)}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			{isMyInfo && <ProfileContainer handleCloseModal={() => setIsMyInfo(false)} />}
		</div>
	);
};

export default NavBar;
