import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import AdminKick from 'components/Admin/AdminKick';
import useStores from 'lib/hooks/useStores';
import { IMemberTypes } from 'interface/MemberTypes';
import MemberRow from 'components/Admin/AdminKick/MemberRow';
import IErrorTypes from 'interface/ErrorTypes';
import ISuccess from 'interface/SuccessTypes';
import { errorToast, successToast } from 'lib/Toast';
import GroupingState from 'lib/util/GroupingState';
import { confirmAlert } from 'lib/SweetAlert';

const AdminKickContainer = observer(() => {
	const { store } = useStores();
	const {
		handleMemberList,
		handleDeleteMember,
		memberList,
	} = store.MemberStore;

	const [keyword, setKeyword] = useState<string>('');

	const requestDeleteMember = useCallback(
		async (memberIdx: number) => {
			confirmAlert(
				'잠시만요!',
				'해당 회원을 강퇴하시겠습니까?',
				'warning',
				async () => {
					await handleDeleteMember(memberIdx)
						.then((response: ISuccess) => {
							if (response.status === 200) {
								successToast('멤버를 강퇴하였습니다.');
								handleMemberList(true);
							}
						})

						.catch((error: IErrorTypes) => {
							const { message } = error.response.data;
							errorToast(message);
							return;
						});
				}
			);
		},
		[handleDeleteMember, handleMemberList, confirmAlert]
	);

	const filterMember: IMemberTypes[] = memberList.filter(
		(member: IMemberTypes) => {
			const { is_admin, name, email } = member;

			const keywordFilter: boolean =
				name.toLowerCase().includes(keyword.toLowerCase()) ||
				email.toLowerCase().includes(keyword.toLowerCase());

			return keywordFilter && !is_admin;
		}
	);

	const memberLists: JSX.Element[] = filterMember.map(
		(member: IMemberTypes) => {
			const { idx, name, email, is_admin } = member;

			return (
				<MemberRow
					idx={idx}
					name={name}
					email={email}
					key={idx}
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
			keywordObject={GroupingState('keyword', keyword, setKeyword)}
		/>
	);
});

export default AdminKickContainer;
