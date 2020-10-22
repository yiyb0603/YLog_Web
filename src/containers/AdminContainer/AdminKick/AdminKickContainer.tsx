import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import AdminKick from 'components/Admin/AdminKick';
import useStores from 'lib/hooks/useStores';
import { IMemberTypes } from 'interface/MemberTypes';
import MemberRow from 'components/Admin/AdminKick/MemberRow';
import IErrorTypes from 'interface/ErrorTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { toast } from 'react-toastify';
import GroupingState from 'lib/util/GroupingState';
import { confirmAlert } from 'lib/SweetAlert';
import isAdmin from 'lib/util/isAdmin';
import { NextRouter, useRouter } from 'next/router';
import redirectPage from 'lib/util/RedirectPage';

const AdminKickContainer = observer(() => {
	const router: NextRouter = useRouter();
	const { store } = useStores();
	const {
		handleMemberList,
		handleDeleteMember,
		memberList,
	} = store.MemberStore;

	// 0: 회원 1: 관리자, 2: 전체
	const [filterKinds, setFilterKinds] = useState<number>(2);
	const [keyword, setKeyword] = useState<string>('');

	const requestDeleteMember = useCallback(
		async (memberIdx: number) => {
			confirmAlert(
				'잠시만요!',
				'해당 회원을 강퇴하시겠습니까?',
				'warning',
				async () => {
					await handleDeleteMember(memberIdx)
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

			if (filterKinds >= 2) {
				return member && keywordFilter;
			}

			return is_admin === Boolean(filterKinds) && keywordFilter;
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
		redirectPage();
		handleMemberList(true);
	}, [handleMemberList, redirectPage]);

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
