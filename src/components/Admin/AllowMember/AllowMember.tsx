import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PageHeader from 'components/Common/Admin/PageHeader';

const style = require('./AllowMember.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AllowMemberProps {
	memberLists: JSX.Element[];
}

const AllowMember = ({ memberLists }: AllowMemberProps) => {
	return (
		<div className={cx('AllowMember')}>
			<PageHeader
				title="멤버 가입승인"
				description="멤버 가입을 수락/거절 할 수 있습니다."
			/>

			<div className={cx('AllowMember-MemberList')}>{memberLists}</div>
		</div>
	);
};

export default AllowMember;
