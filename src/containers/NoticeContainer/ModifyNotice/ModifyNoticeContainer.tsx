import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { NextRouter, useRouter } from 'next/router';
import {
	INoticeRequestTypes,
	INoticeResponseTypes,
} from 'interface/NoticeTypes';
import { showAlert } from 'lib/SweetAlert';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import { toast } from 'react-toastify';
import NoticeForm from 'components/Common/NoticeForm';
import GroupingState from 'lib/GroupingState';
import ModifyNotice from 'components/Notice/ModifyNotice';

const ModifyNoticeContainer = observer(() => {
	const { store } = useStores();
	const { handleModifyNotice, handleNoticeView } = store.NoticeStore;

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const [title, setTitle] = useState<string>('');
	const [contents, setContents] = useState<string>('');

	const requestNoticeData = useCallback(async () => {
		await handleNoticeView(idx).then((response: INoticeResponseTypes) => {
			const { notice } = response.data;
			setTitle(notice.title!);
			setContents(notice.contents!);
		});
	}, [idx, handleNoticeView]);

	const requestModifyNotice = useCallback(async () => {
		const request: INoticeRequestTypes = {
			idx: Number(idx),
			title,
			contents,
		};

		if (!title.trim() || !contents.trim()) {
			toast.error('내용을 모두 입력해주세요!');
			return;
		}

		await handleModifyNotice(request)
			.then((response: ISuccessTypes) => {
				if (response.status === 200) {
					showAlert('성공', '공지사항을 수정하였습니다.', 'success');
					router.push(`/`);
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
	}, [idx, title, contents, handleModifyNotice, router]);

	const noticeForm: JSX.Element = (
		<NoticeForm
			titleObject={GroupingState('title', title, setTitle)}
			contentsObject={GroupingState('contents', contents, setContents)}
			requestFunction={requestModifyNotice}
		/>
	);

	useEffect(() => {
		if (idx) {
			requestNoticeData();
		}
	}, [idx, requestNoticeData]);

	return <ModifyNotice noticeForm={noticeForm} />;
});

export default ModifyNoticeContainer;