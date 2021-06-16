import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Table } from 'react-bootstrap';
import PageHeader from 'components/Common/Admin/PageItems/PageHeader';
import SearchInput from 'components/Common/Input/SearchInput';
import NoTopics from 'components/Common/Admin/NoTopics';

const style = require('./AdminKick.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AdminKickProps {
	memberLists: JSX.Element[];

	keywordObject: {
		keyword: string;
		setKeyword: Dispatch<SetStateAction<string>>;
	};
}

const AdminKick = ({
	memberLists,
	keywordObject,
}: AdminKickProps) => {
	const { keyword, setKeyword } = keywordObject;

	return (
		<div className={cx('AdminKick')}>
			<PageHeader
				title='멤버 강제탈퇴'
				description='멤버를 강제탈퇴 시킬 수 있습니다.'
			/>

			<div className={cx('AdminKick-FilterSearch')}>
				{
					memberLists.length > 0 &&
					<SearchInput
						keyword={keyword}
						setKeyword={setKeyword}
					/>
				}
			</div>

			<div className={cx('AdminKick-Table')}>
				{
					memberLists.length <= 0 ?
					<NoTopics topic='회원이 존재하지 않습니다.' /> :

					<Table hover style={{ width: '100%' }}>
						<thead>
							<tr>
								<th>프로필</th>
								<th>분류</th>
								<th>이름</th>
								<th>이메일</th>
								<th>강퇴</th>
							</tr>
						</thead>
						
						<tbody>
							{memberLists}
						</tbody>
					</Table>
				}
			</div>
		</div>
	);
};

export default AdminKick;
