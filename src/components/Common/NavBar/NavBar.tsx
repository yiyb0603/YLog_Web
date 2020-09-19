import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BiSearch } from 'react-icons/bi';

const style = require('./NavBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavBar = () => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	return (
		<div className={cx('NavBar')}>
			<div className={cx('NavBar-Contents')}>
				<img
					className={cx('NavBar-Contents-Logo')}
					src="/icon/Logo.PNG"
					alt="logo"
				/>

				{/* <div
					className={cx('NavBar-Contents-SearchWrapper', {
						'NavBar-Contents-SearchWrapper-Focused': isFocus,
					})}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
				>
					<BiSearch style={{ marginRight: 5, fontSize: 25 }} />
					<input type="text" placeholder="검색어를 입력하세요" />
				</div> */}

				<div className={cx('NavBar-Contents-Right')}>
					<div>로그인</div>
					<img src="/icon/profile_default.jpg" alt="profile" />
				</div>
			</div>
		</div>
	);
};

export default NavBar;
