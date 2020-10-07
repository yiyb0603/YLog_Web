import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SideNavbar from 'components/Common/Admin/SideNavbar';

const style = require('./AdminTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AdminTemplateProps {
	children?: ReactNode;
}

const AdminTemplate = ({ children }: AdminTemplateProps) => {
	return (
		<>
			<SideNavbar />
		</>
	);
};

export default AdminTemplate;
