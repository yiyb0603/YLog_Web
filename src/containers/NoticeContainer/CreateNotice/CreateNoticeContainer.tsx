import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { INoticeRequestTypes } from 'interface/NoticeTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import { NextRouter, useRouter } from 'next/router';
import IErrorTypes from 'interface/ErrorTypes';
import { toast } from 'react-toastify';
import CreateNotice from 'components/Notice/CreateNotice';
import GroupingState from 'lib/GroupingState';

const CreateNoticeContainer = observer(() => {
	const { store } = useStores();
	const { handleCreateNotice } = store.NoticeStore;

	const router: NextRouter = useRouter();

	const [title, setTitle] = useState<string>('');
	const [contents, setContents] = useState<string>('');

	const requestCreateNotice = useCallback(async (): Promise<void> => {
		const request: INoticeRequestTypes = {
			title,
			contents,
		};

		if (!title.trim() || !contents.trim()) {
			toast.error('내용을 모두 입력해주세요!');
			return;
		}

		await handleCreateNotice(request)
			.then((response: ISuccessTypes) => {
				if (response.status === 200) {
					showAlert('성공', '공지사항 등록을 성공하였습니다.', 'success');
					router.push(`/`);
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
	}, [title, contents, handleCreateNotice, router]);

	return (
		<CreateNotice
			titleObject={GroupingState('title', title, setTitle)}
			contentsObject={GroupingState('contents', contents, setContents)}
			requestCreateNotice={requestCreateNotice}
		/>
	);
});

export default CreateNoticeContainer;
