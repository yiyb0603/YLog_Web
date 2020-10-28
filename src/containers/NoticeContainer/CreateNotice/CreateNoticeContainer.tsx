import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { INoticeRequestTypes } from 'interface/NoticeTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import { NextRouter, useRouter } from 'next/router';
import IErrorTypes from 'interface/ErrorTypes';
import { errorToast, successToast } from 'lib/Toast';
import CreateNotice from 'components/Notice/CreateNotice';
import GroupingState from 'lib/util/GroupingState';
import NoticeForm from 'components/Notice/NoticeForm';
import validationNoticeWrite from 'validation/Notice/validationNoticeWrite';

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

		if (!validationNoticeWrite(request)) {
			return;
		}

		await handleCreateNotice(request)
			.then(({ status }: ISuccessTypes) => {
				if (status === 200) {
					showAlert('성공', '공지사항 등록을 성공하였습니다.', 'success');
					router.push(`/`);
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [title, contents, handleCreateNotice, router]);

	const noticeForm: JSX.Element = (
		<NoticeForm
			titleObject={GroupingState('title', title, setTitle)}
			contentsObject={GroupingState('contents', contents, setContents)}
			requestFunction={requestCreateNotice}
		/>
	);

	return <CreateNotice noticeForm={noticeForm} />;
});

export default CreateNoticeContainer;
