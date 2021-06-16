import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./MemberRow.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MemberRowProps {
	idx: number;
	name: string;
	email: string;
	isAdmin: boolean;
	requestDeleteMember: (memberIdx: number) => Promise<void>;
}

const MemberRow = ({
	idx,
	name,
	email,
	isAdmin,
	requestDeleteMember,
}: MemberRowProps): JSX.Element => {
	return (
		<tr className={cx('MemberRow')}>
			<td>
				<img
					className={cx('MemberRow-Profile')}
					src='/assets/icon/profile_default.jpg'
					alt='profile'
				/>
			</td>
			<td>{isAdmin ? '관리자' : '회원'}</td>
			<td>{name}</td>
			<td>{email}</td>
			<th>
				<button
					className={cx('MemberRow-Kick')}
					onClick={() => requestDeleteMember(idx)}
				>
					강퇴
				</button>
			</th>
		</tr>
	);
};

export default MemberRow;
