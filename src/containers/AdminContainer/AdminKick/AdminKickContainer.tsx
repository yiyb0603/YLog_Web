import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import AdminKick from 'components/Admin/AdminKick';
import useStores from 'lib/useStores';
import { IMemberTypes } from 'interface/MemberTypes';
import MemberRow from 'components/Admin/AdminKick/MemberRow';
import IErrorTypes from 'interface/ErrorTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { toast } from 'react-toastify';
import GroupingState from 'lib/GroupingState';

const AdminKickContainer = observer(() => {
	const { store } = useStores();
	const {
		handleMemberList,
		handleDeleteMember,
		memberList,
	} = store.MemberStore;

	const [filterKinds, setFilterKinds] = useState<number>(2);
	const [keyword, setKeyword] = useState<string>('');
	// 0: 회원 1: 관리자, 2: 전체

	const requestDeleteMember = useCallback(
		async (memberId: string) => {
			await handleDeleteMember(memberId)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('멤버를 강퇴하였습니다.');
						handleMemberList(true);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		},
		[handleDeleteMember, handleMemberList]
	);

	const filterMember: IMemberTypes[] = memberList.filter(
		(member: IMemberTypes) => {
			const { is_admin, name, id } = member;

			const keywordFilter: boolean =
				name.toLowerCase().includes(keyword.toLowerCase()) ||
				id.toLowerCase().includes(keyword.toLowerCase());

			if (filterKinds >= 2) {
				return member && keywordFilter;
			}

			return is_admin === Boolean(filterKinds) && keywordFilter;
		}
	);

	const memberLists: JSX.Element[] = filterMember.map(
		(member: IMemberTypes) => {
			const { id, name, email, is_admin } = member;

			return (
				<MemberRow
					id={id}
					name={name}
					email={email}
					key={id}
					isAdmin={is_admin}
					requestDeleteMember={requestDeleteMember}
				/>
			);
		}
	);

	useEffect(() => {
		handleMemberList(true);
	}, [handleMemberList]);

	return (
		<AdminKick
			memberLists={memberLists}
			filterKindsObject={GroupingState(
				'filterKinds',
				filterKinds,
				setFilterKinds
			)}
			keywordObject={GroupingState('keyword', keyword, setKeyword)}
		/>
	);
});

export default AdminKickContainer;