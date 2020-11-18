import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import PostLike from 'components/Post/PostView/PostLike';
import IErrorTypes from 'interface/ErrorTypes';
import { errorToast } from 'lib/Toast';
import ISuccessTypes from 'interface/SuccessTypes';
import getMyInfo from 'lib/util/getMyInfo';
import { ILikeTypes } from 'interface/LikeTypes';

const LikeContainer = observer(() => {
  const { store } = useStores();
  const { likeList, handleLikeList, handlePostLike, handleDeleteLike } = store.LikeStore;

  const router: NextRouter = useRouter();
  const postIdx: number = Number(router.query.idx);
  const myInfo = getMyInfo();

  const requestLikeList = useCallback(async () => {
    await handleLikeList(postIdx)
    .catch((error: IErrorTypes) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [postIdx, handleLikeList]);

  const requestPostCount = useCallback(async (): Promise<void> => {
    await handlePostLike(postIdx)
    .then(({ status }: ISuccessTypes) => {
      if (status === 200) {
        requestLikeList();
      }
    })

    .catch((error: IErrorTypes) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [requestLikeList, handlePostLike]);

  const requestDeleteCount = useCallback(async (): Promise<void> => {
    const myLike: ILikeTypes = likeList.find((like: ILikeTypes) => like.user_idx === myInfo.idx);
    const myLikeIndex: number = likeList.lastIndexOf(myLike);

    await handleDeleteLike(likeList[myLikeIndex].idx)
    .then(({ status }: ISuccessTypes) => {
      if (status === 200) {
        requestLikeList();
      }
    })
    .catch((error: IErrorTypes) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [likeList, requestLikeList, handleDeleteLike]);

  useEffect(() => {
    if (Number.isInteger(postIdx)) {
      requestLikeList();
    }
  }, [postIdx, requestLikeList]);

  return (
    <PostLike likeList={likeList} requestPostCount={requestPostCount} requestDeleteCount={requestDeleteCount} />
  )
});

export default LikeContainer;