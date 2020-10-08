import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Table } from 'react-bootstrap';
import PageHeader from 'components/Common/Admin/PageHeader';

const style = require('./AdminKick.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AdminKickProps {
	memberLists: JSX.Element[];
}

const AdminKick = ({ memberLists }: AdminKickProps) => {
	return (
		<div className={cx('AdminKick')}>
			<PageHeader
				title="멤버 강제탈퇴"
				description="멤버를 강제탈퇴 시킬 수 있습니다."
			/>

			<div className={cx('AdminKick-Table')}>
				<Table hover style={{ width: '100%' }}>
					<thead>
						<tr>
							<th>프로필</th>
							<th>아이디</th>
							<th>이름</th>
							<th>이메일</th>
							<th>강퇴</th>
						</tr>
					</thead>

					<tbody>{memberLists}</tbody>
				</Table>
			</div>
		</div>
	);
};

export default AdminKick;
