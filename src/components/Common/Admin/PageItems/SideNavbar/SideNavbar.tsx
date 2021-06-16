import React, {
	CSSProperties,
	Dispatch,
	SetStateAction,
} from 'react';
import { BsPersonCheckFill, BsBoxArrowInLeft } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NavItem from './NavItem';
import NavToggle from './NavToggle';
import getMyInfo from 'lib/util/getMyInfo';

const style = require('./SideNavbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ISideNavbarProps {
	isEnabled: boolean;
	setIsEnabled: Dispatch<SetStateAction<boolean>>;
}

const SideNavbar = ({ isEnabled, setIsEnabled }: ISideNavbarProps): JSX.Element => {
	const { name, email } = getMyInfo();

	const iconStyle: CSSProperties = {
		fontSize: 24,
		marginRight: 10,
	};

	return (
		<div className={cx('SideNavbar-Wrapper')}>
			<div className={cx('SideNavbar')}>
				<div className={cx('SideNavbar-Contents')}>
					<img
						className={cx('SideNavbar-Contents-Logo')}
						src='/assets/icon/Logo.PNG'
						alt='shortcut'
					/>

					<div className={cx('SideNavbar-Contents-Profile')}>
						<img src={'/assets/icon/profile_default.jpg'} alt='profile' />
						<div className={cx('SideNavbar-Contents-Profile-Name')}>{name}</div>
						<div>{email}</div>
					</div>

					<div className={cx('SideNavbar-Contents-Items')}>
						<NavItem
							link={'/admin'}
							name='가입 승인'
							icon={<BsPersonCheckFill style={iconStyle} />}
						/>
						<NavItem
							link={'/admin/kick'}
							name='멤버 강퇴'
							icon={<MdClose style={iconStyle} />}
						/>
					</div>
				</div>

				<NavItem
					link={'/admin/login'}
					name='로그아웃'
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
