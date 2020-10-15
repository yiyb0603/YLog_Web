import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { IReleaseRequestTypes } from 'interface/ReleaseTypes';
import { toast } from 'react-toastify';
import ISuccessTypes from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import { NextRouter, useRouter } from 'next/router';
import IErrorTypes from 'interface/ErrorTypes';
import ReleaseWriteForm from 'components/Release/ReleaseWrite/ReleaseWriteForm';
import GroupingState from 'lib/util/GroupingState';
import ReleaseWrite from 'components/Release/ReleaseWrite';

const ReleaseWriteContainer = observer(() => {
  const router: NextRouter = useRouter();
  const { store } = useStores();
  const { handleCreateRelease } = store.ReleaseStore;

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const requestCreateRelease = useCallback(async () => {
    const request: IReleaseRequestTypes = {
      title,
      contents
    };

    if (!title.trim() || !contents.trim()) {
      toast.error('내용을 모두 입력해주세요!');
      return;
    }

    await handleCreateRelease(request)
    .then(({ status }: ISuccessTypes) => {
      if (status === 200) {
        showAlert('성공', '릴리즈 노트를 작성하였습니다.', 'success');
        router.push('/release');
      }
    })

    .catch((error: IErrorTypes) => {
      const { message } = error.response.data;
      toast.error(message);
      return;
    });
  }, [title, contents, router, handleCreateRelease]);

  const releaseWriteForm: JSX.Element = (
    <ReleaseWriteForm
      titleObject ={GroupingState('title', title, setTitle)}
      contentsObject={GroupingState('contents', contents, setContents)}
      requestCreateRelease ={requestCreateRelease}
    />
  )

  return (
    <ReleaseWrite
      releaseWriteForm = {releaseWriteForm}
    />
  )
});

export default ReleaseWriteContainer;