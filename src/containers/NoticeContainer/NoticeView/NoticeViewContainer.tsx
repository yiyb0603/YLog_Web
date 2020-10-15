import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import IErrorTypes from 'interface/ErrorTypes';
import { toast } from 'react-toastify';
import NoticeView from 'components/Notice/NoticeView';
import ISuccessTypes from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import PostLoading from 'components/Common/Loading/PostLoading';

const NoticeViewContainer = observer(() => {
	const { store } = useStores();
	const {
		handleNoticeView,
		noticeInfo,
		handleDeleteNotice,
		isLoading
	} = store.NoticeStore;

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const requestNoticeView = useCallback(async (): Promise<void> => {
		await handleNoticeView(idx).catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			toast.error(message);
			return;
		});
	}, [idx, handleNoticeView]);

	const requestDeleteNotice = useCallback(
		async (idx: number): Promise<void> => {
			await handleDeleteNotice(idx)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						showAlert('성공', '공지사항을 삭제하였습니다.', 'success');
						router.push(`/`);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		},
		[handleDeleteNotice, router]
	);

	useEffect(() => {
		if (idx) {
			requestNoticeView();
		}
	}, [idx, requestNoticeView]);

	return (
		<>
		{
			isLoading ? <PostLoading /> :
			<NoticeView
				noticeInfo={noticeInfo}
				requestDeleteNotice={requestDeleteNotice}
			/>
		}
		</>
	);
});

export default NoticeViewContainer;
