import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./MemberRow.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MemberRowProps {
	id: string;
	name: string;
	email: string;
	requestDeleteMember: (memberId: string) => Promise<void>;
}

const MemberRow = ({
	id,
	name,
	email,
	requestDeleteMember,
}: MemberRowProps) => {
	return (
		<tr className={cx('MemberRow')}>
			<td>
				<img
					className={cx('MemberRow-Profile')}
					src="/assets/icon/profile_default.jpg"
					alt="profile"
				/>
			</td>
			<td>{id}</td>
			<td>{name}</td>
			<td>{email}</td>
			<th>
				<button
					className={cx('MemberRow-Kick')}
					onClick={() => requestDeleteMember(id)}
				>
					강퇴
				</button>
			</th>
		</tr>
	);
};

export default MemberRow;
