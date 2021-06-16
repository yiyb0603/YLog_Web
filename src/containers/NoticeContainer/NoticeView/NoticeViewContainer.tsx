import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import IError from 'interface/ErrorTypes';
import { errorToast } from 'lib/Toast';
import NoticeView from 'components/Notice/NoticeView';
import ISuccess from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import PostLoading from 'components/Common/Loading/PostLoading';
import { INotice } from 'interface/NoticeTypes';
import { useMemo } from 'react';

interface INoticeViewContainerProps {
	notice: INotice;
}

const NoticeViewContainer = observer(({
	notice,
}: INoticeViewContainerProps) => {
	const { store } = useStores();
	const {
		handleNoticeView,
		noticeInfo,
		handleDeleteNotice,
		isLoading
	} = store.NoticeStore;

	const router: NextRouter = useRouter();
	const { idx } = useMemo(() => router.query, [router]);

	const requestNoticeView = useCallback(async (): Promise<void> => {
		await handleNoticeView(idx).catch((error: IError) => {
			router.back();

			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [idx, router, handleNoticeView]);

	const requestDeleteNotice = useCallback(async (idx: number): Promise<void> => {
		await handleDeleteNotice(idx)
		.then(({ status }: ISuccess) => {
			if (status === 200) {
				showAlert('성공', '공지사항을 삭제하였습니다.', 'success');
				router.push(`/`);
			}
		})

		.catch((error: IError) => {
			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [handleDeleteNotice, router]);

	useEffect(() => {
		if (idx) {
			requestNoticeView();
		}
	}, [idx, requestNoticeView]);

	if (!notice.idx || isLoading) {
		return <PostLoading />;
	}

	return (
		<NoticeView
			noticeInfo={noticeInfo}
			requestDeleteNotice={requestDeleteNotice}
		/>
	);
});

export default NoticeViewContainer;
