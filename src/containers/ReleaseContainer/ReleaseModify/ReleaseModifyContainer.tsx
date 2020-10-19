import { observer } from 'mobx-react';
import { NextRouter, useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReleaseModify from 'components/Release/ReleaseModify';
import ReleaseModifyForm from 'components/Release/ReleaseModify/ReleaseModifyForm';
import IErrorTypes from 'interface/ErrorTypes';
import { IReleaseTypes } from 'interface/ReleaseTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import useStores from 'lib/hooks/useStores';
import { showAlert } from 'lib/SweetAlert';
import GroupingState from 'lib/util/GroupingState';
import { validationReleaseWrite } from 'validation/Release/validationRelease';

const ReleaseModifyContainer = observer(() => {
  const router: NextRouter = useRouter();
  const releaseIdx: number = Number(router.query.idx);

  const { store } = useStores();
  const { handleModifyRelease, handleReleaseView, releaseInfo } = store.ReleaseStore;

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  const requestModifyRelease = useCallback(async () => {
    const request: IReleaseTypes = {
      idx: releaseIdx,
      title,
      contents
    };

    if (!validationReleaseWrite(request)) {
      return;
    }

    await handleModifyRelease(request)
    .then(({ status }: ISuccessTypes) => {
      if (status === 200) {
        showAlert('성공', '릴리즈 노트를 수정하였습니다.', 'success');
        router.push(`/release/${releaseIdx}`);
      }
    })

    .catch((error: IErrorTypes) => {
      const { status, message } = error.response.data;
      toast.error(message);
      return;
    })
  }, [releaseIdx, title, contents, handleModifyRelease, router]);

  const releaseModifyForm: JSX.Element = (
    <ReleaseModifyForm
      titleObject ={GroupingState('title', title, setTitle)}
      contentsObject ={GroupingState('contents', contents, setContents)}
      requestModifyRelease ={requestModifyRelease}
    />
  )

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
    <ReleaseModify
      releaseModifyForm ={releaseModifyForm}
    />
  )
});

export default ReleaseModifyContainer;