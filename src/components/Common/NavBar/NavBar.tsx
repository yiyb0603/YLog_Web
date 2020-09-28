import React, {
	ChangeEvent,
	KeyboardEvent,
	useCallback,
	useState,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSearch } from 'react-icons/bi';
import { NextRouter, useRouter } from 'next/router';
import Profile from 'components/Home/Profile';
import Link from 'next/link';
import { getStorage } from 'lib/Storage';
import { onKeyDown } from 'lib/onKeyDown';
import { getToken } from 'lib/Token';

const style = require('./NavBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavBar = () => {
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [isMyInfo, setIsMyInfo] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');

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
					src="/icon/Logo.PNG"
					alt="logo"
				/>

				<div
					className={cx('NavBar-Contents-SearchWrapper', {
						'NavBar-Contents-SearchWrapper-Focused': isFocus,
					})}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
				>
					<BiSearch
						style={{ marginRight: 5, fontSize: 25, cursor: 'pointer' }}
						onClick={searchQuery}
					/>
					<input
						type="text"
						placeholder="검색어를 입력하세요"
						value={keyword}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setKeyword(e.target.value)
						}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
							onKeyDown(e, searchQuery)
						}
					/>
				</div>

				<div className={cx('NavBar-Contents-Right')}>
					<Link href="/sign">
						{getStorage('ylog-token') !== null ? (
							<div>로그아웃</div>
						) : (
							<div>로그인</div>
						)}
					</Link>
					{typeof window !== 'undefined' && getToken() !== null ? (
						<img
							src="/icon/profile_default.jpg"
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
