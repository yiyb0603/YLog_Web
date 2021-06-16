import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { NextRouter, useRouter } from 'next/router';

const style = require('./NavItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NavItemProps {
	icon: JSX.Element;
	name: string;
	link: string;
}

const NavItem = ({ icon, name, link }: NavItemProps): JSX.Element => {
	const router: NextRouter = useRouter();

	return (
		<div
			className={cx('NavItem', {
				'NavItem-Current': router.pathname === link,
			})}
			onClick={() => router.push(link)}
		>
			<div>{icon}</div>
			<div className={cx('NavItem-Name')}>{name}</div>
		</div>
	);
};

export default NavItem;
