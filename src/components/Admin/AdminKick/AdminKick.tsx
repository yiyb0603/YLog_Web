import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Table } from 'react-bootstrap';
import PageHeader from 'components/Common/Admin/PageHeader';
import SelectBox from 'components/Common/SelectBox';
import SearchInput from 'components/Common/Input/SearchInput';
import NoTopics from 'components/Common/Admin/NoTopics';

const style = require('./AdminKick.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AdminKickProps {
	memberLists: JSX.Element[];
	filterKindsObject: {
		filterKinds: number;
		setFilterKinds: Dispatch<SetStateAction<number>>;
	};

	keywordObject: {
		keyword: string;
		setKeyword: Dispatch<SetStateAction<string>>;
	};
}

const AdminKick = ({
	memberLists,
	filterKindsObject,
	keywordObject,
}: AdminKickProps) => {
	const { filterKinds, setFilterKinds } = filterKindsObject;
	const { keyword, setKeyword } = keywordObject;

	return (
		<div className={cx('AdminKick')}>
			<PageHeader
				title="멤버 강제탈퇴"
				description="멤버를 강제탈퇴 시킬 수 있습니다."
			/>

			<div className={cx('AdminKick-FilterSearch')}>
				<SelectBox
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setFilterKinds(Number(e.target.value))
					}
				>
					<option value={2}>전체보기</option>
					<option value={0}>회원</option>
					<option value={1}>관리자</option>
				</SelectBox>

				<SearchInput keyword={keyword} setKeyword={setKeyword} />
			</div>

			<div className={cx('AdminKick-Table')}>
				<Table hover style={{ width: '100%' }}>
					<thead>
						<tr>
							<th>프로필</th>
							<th>분류</th>
							<th>아이디</th>
							<th>이름</th>
							<th>이메일</th>
							<th>강퇴</th>
						</tr>
					</thead>

					<tbody>
						{memberLists.length <= 0 ? (
							<NoTopics topic="회원이 존재하지 않습니다." />
						) : (
							memberLists
						)}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default AdminKick;
