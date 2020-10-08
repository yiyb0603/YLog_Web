import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SideNavbar from 'components/Common/Admin/SideNavbar';

const style = require('./AdminTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AdminTemplateProps {
	children?: ReactNode;
}

const AdminTemplate = ({ children }: AdminTemplateProps) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(true);

	return (
		<div
			className={cx('AdminTemplate', {
				'AdminTemplate-hidden': !isEnabled,
			})}
		>
			<SideNavbar isEnabled={isEnabled} setIsEnabled={setIsEnabled} />

			<div className={cx('AdminTemplate-Children')}>{children && children}</div>
		</div>
	);
};

export default AdminTemplate;
