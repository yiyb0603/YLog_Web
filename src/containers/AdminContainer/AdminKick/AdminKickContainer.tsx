import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import AdminKick from 'components/Admin/AdminKick';
import useStores from 'lib/useStores';
import { IMemberTypes } from 'interface/MemberTypes';
import MemberRow from 'components/Admin/AdminKick/MemberRow';
import IErrorTypes from 'interface/ErrorTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { toast } from 'react-toastify';

const AdminKickContainer = observer(() => {
	const { store } = useStores();
	const {
		handleMemberList,
		handleDeleteMember,
		memberList,
	} = store.MemberStore;

	const requestDeleteMember = useCallback(
		async (memberId: string) => {
			await handleDeleteMember(memberId)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.error('멤버를 강퇴하였습니다.');
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

	const memberLists: JSX.Element[] = memberList.map((member: IMemberTypes) => {
		const { id, name, email } = member;

		return (
			<MemberRow
				id={id}
				name={name}
				email={email}
				key={id}
				requestDeleteMember={requestDeleteMember}
			/>
		);
	});

	useEffect(() => {
		handleMemberList(true);
	}, [handleMemberList]);

	return <AdminKick memberLists={memberLists} />;
});

export default AdminKickContainer;
