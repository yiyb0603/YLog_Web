import React, { useCallback, useEffect } from 'react';
import ReleasePage from 'components/Release/ReleasePage';
import useStores from 'lib/hooks/useStores';
import { observer } from 'mobx-react';
import { NextRouter, useRouter } from 'next/router';
import PostLoading from 'components/Common/Loading/PostLoading';
import ISuccess from 'interface/SuccessTypes';
import { showAlert } from 'lib/SweetAlert';
import IError from 'interface/ErrorTypes';
import { errorToast, successToast } from 'lib/Toast';

const ReleaseViewContainer = observer((): JSX.Element => {
  const router: NextRouter = useRouter();
  const releaseIdx: number = Number(router.query.idx);

  const { store } = useStores();
  const { handleReleaseView, handleDeleteRelease, releaseInfo, isLoading } = store.ReleaseStore;

  const requestReleaseView = useCallback(async () => {
    if (releaseIdx) {
      await handleReleaseView(releaseIdx)
      .catch((error: IError) => {
        router.back();

        const { message } = error.response.data;
        errorToast(message);
        return;
      })
    }
  }, [releaseIdx, router, handleReleaseView]);

  const requestReleaseDelete = useCallback(async (idx: number) => {
    await handleDeleteRelease(idx)
    .then(({ status }: ISuccess) => {
      if (status === 200) {
        showAlert('성공', '릴리즈 노트를 삭제하였습니다.', 'success');
        router.push('/release');
      }
    })
  }, [handleDeleteRelease]);

  useEffect(() => {
    requestReleaseView();
  }, [requestReleaseView]);

  if (isLoading) {
    return <PostLoading />;
  }

  return (
    <ReleasePage
      releaseInfo ={releaseInfo}
      requestReleaseDelete ={requestReleaseDelete}
    />
  );
});

export default ReleaseViewContainer;