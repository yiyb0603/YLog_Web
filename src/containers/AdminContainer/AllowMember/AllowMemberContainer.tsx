import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import AllowMember from 'components/Admin/AllowMember';
import { errorToast, successToast } from 'lib/Toast';
import ISuccess from 'interface/SuccessTypes';
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
		async (memberIdx: number) => {
			await handleAllowMember(memberIdx)
				.then((response: ISuccess) => {
					if (response.status === 200) {
						successToast('회원가입을 승인하였습니다.');
						handleMemberList(null);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleAllowMember, handleMemberList]
	);

	const requestRefuseMember = useCallback(
		async (memberIdx: number) => {
			await handleRefuseMember(memberIdx)
				.then((response: ISuccess) => {
					if (response.status === 200) {
						successToast('회원가입을 거절하였습니다.');
						handleMemberList(null);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleRefuseMember, handleMemberList]
	);

	const memberLists: JSX.Element[] = memberList.map((member: IMemberTypes) => {
		const { idx, name, email, is_admin } = member;
		return (
			<MemberCard
				key={idx}
				idx={idx}
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
