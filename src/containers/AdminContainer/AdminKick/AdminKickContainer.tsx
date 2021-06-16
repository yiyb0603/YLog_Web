import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react';
import AdminKick from 'components/Admin/AdminKick';
import useStores from 'lib/hooks/useStores';
import MemberRow from 'components/Admin/AdminKick/MemberRow';
import IError from 'interface/ErrorTypes';
import ISuccess from 'interface/SuccessTypes';
import { errorToast, successToast } from 'lib/Toast';
import GroupingState from 'lib/util/GroupingState';
import { confirmAlert } from 'lib/SweetAlert';
import { IUser } from 'interface/AuthTypes';

const AdminKickContainer = observer((): JSX.Element => {
	const { store } = useStores();
	const {
		handleMemberList,
		handleDeleteMember,
		memberList,
	} = store.MemberStore;

	const [keyword, setKeyword] = useState<string>('');

	const filterMember: IUser[] = useMemo(() => {
		return memberList.filter(
			(member: IUser) => {
				const { isAdmin, name, email } = member;
	
				const keywordFilter: boolean =
					name.toLowerCase().includes(keyword.toLowerCase()) ||
					email.toLowerCase().includes(keyword.toLowerCase());
	
				return keywordFilter && !isAdmin;
			}
		);
	}, [memberList, keyword]);

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

						.catch((error: IError) => {
							const { message } = error.response.data;
							errorToast(message);
							return;
						});
				}
			);
		},
		[handleDeleteMember, handleMemberList, confirmAlert]
	);

	const memberLists: JSX.Element[] = useMemo(() => {
		return filterMember.map((member: IUser) => {
				const { idx, name, email, isAdmin } = member;
	
				return (
					<MemberRow
						idx={idx}
						name={name}
						email={email}
						key={idx}
						isAdmin={isAdmin}
						requestDeleteMember={requestDeleteMember}
					/>
				);
			}
		);
	}, [filterMember, requestDeleteMember]);

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
