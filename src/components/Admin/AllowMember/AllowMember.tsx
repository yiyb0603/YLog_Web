import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./AllowMember.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AllowMemberProps {}

const AllowMember = ({}: AllowMemberProps) => {
	return (
		<>
			<div></div>
		</>
	);
};

export default AllowMember;
