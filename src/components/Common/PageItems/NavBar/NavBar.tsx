import React, { SyntheticEvent, useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { getUserToken } from 'Token';
import ProfileContainer from 'containers/ProfileContainer';
import getMyInfo from 'lib/util/getMyInfo';
import SearchInput from '../../Input/SearchInput';
import { IToken } from 'interface/AuthTypes';

const style = require('./NavBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavBar = () => {
	const router: NextRouter = useRouter();
	const routerKeyword: string = useMemo(() => String(router.query.keyword || ''), [router]);
	const myInfo: IToken = useMemo(() => getMyInfo(), [getMyInfo]);

	const [isMyInfo, setIsMyInfo] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>(routerKeyword);

	const searchQuery = useCallback((): void => {
		if (routerKeyword === keyword) {
			return;
		}

		if (!keyword) {
			router.push(`/`);
			return;
		}

		router.push(`/?keyword=${keyword}`);
	}, [routerKeyword, keyword, router]);

	return (
		<div className={cx('NavBar')}>
			<div className={cx('NavBar-Contents')}>
				<img
					onClick={() => router.push('/')}
					className={cx('NavBar-Contents-Logo')}
					src='/assets/icon/Logo.PNG'
					alt='logo'
				/>

				<SearchInput
					keyword={keyword}
					setKeyword={setKeyword}
					requestFunction={searchQuery}
				/>

				<div className={cx('NavBar-Contents-Right')}>
					<Link href='/sign'>
						<div className={cx('NavBar-Contents-Right-LogText')}>
							{getUserToken() ? '로그아웃' : '로그인'}
						</div>
					</Link>
					{getUserToken() && (
						<img
							src={(myInfo && myInfo.profileImage) || '/assets/icon/profile_default.jpg'}
							alt='profile'
							onError={(e: SyntheticEvent<HTMLImageElement, Event>) => e.currentTarget.src = '/assets/icon/profile_default.jpg'}
							onClick={() => setIsMyInfo(true)}
						/>
					)}
				</div>
			</div>
			{
				isMyInfo &&
				<ProfileContainer
					handleCloseModal={() => setIsMyInfo(false)}
				/>
			}
		</div>
	);
};

export default NavBar;
