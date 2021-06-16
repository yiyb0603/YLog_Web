import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import GroupingState from 'lib/util/GroupingState';
import NoticeForm from 'components/Notice/NoticeForm';
import { errorToast } from 'lib/Toast';
import IError from 'interface/ErrorTypes';
import ISuccess from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import validationNoticeWrite from 'validation/Notice/validationNoticeWrite';
import { INotice, INoticeResponseTypes } from 'interface/NoticeTypes';
import { NextRouter, useRouter } from 'next/router';
import NoticeTemplate from 'components/Notice/NoticeTemplate';

const NoticeFormContainer = observer((): JSX.Element => {
  const { store } = useStores();
	const { handleCreateNotice, handleModifyNotice, handleNoticeView } = store.NoticeStore;

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
  
  const requestCreateNotice = useCallback(async (): Promise<void> => {
		const request: INotice = {
			title,
			contents,
		};

		if (!validationNoticeWrite(request)) {
			return;
		}

		await handleCreateNotice(request)
			.then(({ status }: ISuccess) => {
				if (status === 200) {
					showAlert('성공', '공지사항 등록을 성공하였습니다.', 'success');
					router.push(`/`);
				}
			})

			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [title, contents, handleCreateNotice, router]);

	const requestModifyNotice = useCallback(async (): Promise<void> => {
		const request: INotice = {
			idx: Number(idx),
			title,
			contents,
		};

		if (!validationNoticeWrite(request)) {
			return;
		}

		await handleModifyNotice(request)
			.then(({ status }: ISuccess) => {
				if (status === 200) {
					showAlert('성공', '공지사항을 수정하였습니다.', 'success');
					router.push(`/`);
				}
			})

			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
  }, [idx, title, contents, handleModifyNotice, router]);
  
  const clickButton = useCallback((): void => {
    if (idx) {
      requestModifyNotice();
      return;
    }

    requestCreateNotice();
  }, [idx, requestCreateNotice, requestModifyNotice]);

	const noticeForm: JSX.Element = (
		<NoticeForm
			titleObject={GroupingState('title', title, setTitle)}
			contentsObject={GroupingState('contents', contents, setContents)}
			requestFunction={clickButton}
		/>
	);

	useEffect(() => {
		if (idx) {
			requestNoticeData();
		}
	}, [idx, requestNoticeData]);

	return <NoticeTemplate noticeForm={noticeForm} />;
});

export default NoticeFormContainer;