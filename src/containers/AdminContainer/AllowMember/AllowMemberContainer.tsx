import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import AllowMember from 'components/Admin/AllowMember';
import { toast } from 'react-toastify';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import { IMemberTypes } from 'interface/MemberTypes';
import MemberCard from 'components/Admin/AllowMember/MemberCard';

const AllowMemberContainer = observer(() => {
	const { store } = useStores();
	const {
		memberList,
		handleMemberList,
		handleAllowMember,
		handleRefuseMember,
	} = store.MemberStore;

	const requestAllowMember = useCallback(
		async (memberId: string) => {
			await handleAllowMember(memberId)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('회원가입을 승인하였습니다.');
						handleMemberList(null);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		},
		[handleAllowMember, handleMemberList]
	);

	const requestRefuseMember = useCallback(
		async (memberId: string) => {
			await handleRefuseMember(memberId)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('회원가입을 거절하였습니다.');
						handleMemberList(null);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		},
		[handleRefuseMember, handleMemberList]
	);

	const memberLists: JSX.Element[] = memberList.map((member: IMemberTypes) => {
		const { id, name, email, is_admin } = member;
		return (
			<MemberCard
				key={id}
				id={id}
				name={name}
				email={email}
				is_admin={is_admin}
				requestAllowMember={requestAllowMember}
				requestRefuseMember={requestRefuseMember}
			/>
		);
	});

	useEffect(() => {
		handleMemberList(null);
	}, [handleMemberList]);

	return <AllowMember memberLists={memberLists} />;
});

export default AllowMemberContainer;
