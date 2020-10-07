import React, { CSSProperties, useState } from 'react';
import { BsPersonCheckFill, BsBoxArrowInLeft } from 'react-icons/bs';
import { AiTwotoneSetting } from 'react-icons/ai';
import { GiHighKick } from 'react-icons/gi';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SecureLS from 'secure-ls';
import NavItem from './NavItem';
import NavToggle from './NavToggle';

const style = require('./SideNavbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SideNavbar = () => {
	const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
	const { name, email } = ls.get('userInfo');

	const [isEnabled, setIsEnabled] = useState<boolean>(true);

	const iconStyle: CSSProperties = {
		fontSize: 24,
		marginRight: 10,
	};

	return (
		<div
			className={cx('SideNavbar-Wrapper', {
				'SideNavbar-Wrapper-hidden': !isEnabled,
			})}
		>
			<div className={cx('SideNavbar')}>
				<div className={cx('SideNavbar-Contents')}>
					<img
						className={cx('SideNavbar-Contents-Logo')}
						src="/assets/icon/Logo.PNG"
						alt="shortcut"
					/>

					<div className={cx('SideNavbar-Contents-Profile')}>
						<img src={'/assets/icon/profile_default.jpg'} alt="profile" />
						<div className={cx('SideNavbar-Contents-Profile-Name')}>{name}</div>
						<div>{email}</div>
					</div>

					<div className={cx('SideNavbar-Contents-Items')}>
						<NavItem
							link={'/admin'}
							name="가입 승인"
							icon={<BsPersonCheckFill style={iconStyle} />}
						/>
						<NavItem
							link={'/'}
							name="멤버 권한"
							icon={<AiTwotoneSetting style={iconStyle} />}
						/>
						<NavItem
							link={'/'}
							name="멤버 강퇴"
							icon={<GiHighKick style={iconStyle} />}
						/>
					</div>
				</div>

				<NavItem
					link={'/admin/login'}
					name="로그아웃"
					icon={<BsBoxArrowInLeft style={iconStyle} />}
				/>
			</div>

			<div onClick={() => setIsEnabled(!isEnabled)}>
				<NavToggle />
			</div>
		</div>
	);
};

export default SideNavbar;
