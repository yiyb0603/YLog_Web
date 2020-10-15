import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import stringEllipsis from 'lib/util/StringEllipsis';

const style = require('./MemberCard.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MemberCardProps {
	idx: number;
	name: string;
	email: string;
	is_admin: boolean;
	requestAllowMember: (memberIdx: number) => Promise<void>;
	requestRefuseMember: (memberIdx: number) => Promise<void>;
}

const MemberCard = ({
	idx,
	name,
	email,
	is_admin,
	requestAllowMember,
	requestRefuseMember,
}: MemberCardProps) => {
	return (
		<div className={cx('MemberCard')}>
			<div className={cx('MemberCard-Contents')}>
				<img src="/assets/icon/profile_default.jpg" alt="profile" />
				<div className={cx('MemberCard-Contents-Info')}>
					<div>{stringEllipsis(email, 18)}</div>
					<div>{name}</div>
					<div>{is_admin && '관리자'}</div>
				</div>
			</div>

			<div className={cx('MemberCard-Buttons')}>
				<div onClick={() => requestAllowMember(idx)}>수락</div>
				<div onClick={() => requestRefuseMember(idx)}>거절</div>
			</div>
		</div>
	);
};

export default MemberCard;
