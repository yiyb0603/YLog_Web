import React, { useState, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { NextRouter, useRouter } from 'next/router';
import useStores from 'lib/hooks/useStores';
import { IReleaseDto } from 'interface/ReleaseTypes';
import { validationReleaseWrite } from 'validation/Release/validationRelease';
import ISuccess from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import IError from 'interface/ErrorTypes';
import { errorToast } from 'lib/Toast';
import GroupingState from 'lib/util/GroupingState';
import ReleaseForm from 'components/Release/ReleaseForm';

const ReleaseFormContainer = observer((): JSX.Element => {
  const router: NextRouter = useRouter();
  const releaseIdx: number = Number(router.query.idx);

  const { store } = useStores();
  const { handleModifyRelease, handleCreateRelease, handleReleaseView, releaseInfo } = store.ReleaseStore;

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const requestWriteRelease = useCallback(async (): Promise<void> => {
    const request: IReleaseDto = {
      title,
      contents,
    };

    if (!validationReleaseWrite(request)) {
      return;
    }

    await handleCreateRelease(request)
    .then(({ status }: ISuccess) => {
      if (status === 200) {
        showAlert('성공', '릴리즈 노트를 작성하였습니다.', 'success');
        router.push('/release');
      }
    })

    .catch((error: IError) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    });
  }, [title, contents, handleCreateRelease, router]);

  const requestModifyRelease = useCallback(async (): Promise<void> => {
    const request: IReleaseDto = {
      idx: releaseIdx,
      title,
      contents
    };

    if (!validationReleaseWrite(request)) {
      return;
    }

    await handleModifyRelease(request)
    .then(({ status }: ISuccess) => {
      if (status === 200) {
        showAlert('성공', '릴리즈 노트를 수정하였습니다.', 'success');
        router.push(`/release/${releaseIdx}`);
      }
    })

    .catch((error: IError) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    });
  }, [releaseIdx, title, contents, handleModifyRelease, router]);

  useEffect(() => {
    if (Number.isInteger(releaseIdx)) {
      handleReleaseView(releaseIdx)
      .then(() => {
        setTitle(releaseInfo.title);
        setContents(releaseInfo.contents);
      })
    }
  }, [handleReleaseView, releaseIdx]);

  return (
    <ReleaseForm
      titleObject ={GroupingState('title', title, setTitle)}
      contentsObject ={GroupingState('contents', contents, setContents)}
      requestFunction ={releaseIdx ? requestModifyRelease : requestWriteRelease}
    />
  );
});

export default ReleaseFormContainer;