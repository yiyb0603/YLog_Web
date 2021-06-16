import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import AllowMember from 'components/Admin/AllowMember';
import { errorToast, successToast } from 'lib/Toast';
import ISuccess from 'interface/SuccessTypes';
import IError from 'interface/ErrorTypes';
import MemberCard from 'components/Admin/AllowMember/MemberCard';
import { IUser } from 'interface/AuthTypes';

const AllowMemberContainer = observer((): JSX.Element => {
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

				.catch((error: IError) => {
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

				.catch((error: IError) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleRefuseMember, handleMemberList]
	);

	const memberLists: JSX.Element[] = memberList.map((member: IUser) => {
		const { idx, name, email, isAdmin } = member;
		return (
			<MemberCard
				key={idx}
				idx={idx}
				name={name}
				email={email}
				isAdmin={isAdmin}
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
