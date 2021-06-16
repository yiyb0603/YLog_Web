import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import PostLike from 'components/Post/PostView/PostLike';
import IError from 'interface/ErrorTypes';
import { errorToast } from 'lib/Toast';
import ISuccess from 'interface/SuccessTypes';
import getMyInfo from 'lib/util/getMyInfo';
import { ILike } from 'interface/LikeTypes';
import { IToken } from 'interface/AuthTypes';

const LikeContainer = observer(() => {
  const { store } = useStores();
  const { likeList, handleLikeList, handlePostLike, handleDeleteLike } = store.LikeStore;

  const router: NextRouter = useRouter();
  const postIdx: number = useMemo(() => Number(router.query.idx), [router]);
  const myInfo: IToken = useMemo(() => getMyInfo(), [getMyInfo]);

  const pressedLike: ILike = useMemo(() => {
    return likeList.find((like: ILike) => like.user.idx === myInfo.idx);
  }, [likeList, myInfo]);

  const requestLikeList = useCallback(async () => {
    await handleLikeList(postIdx)
    .catch((error: IError) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [postIdx, handleLikeList]);

  const requestPostCount = useCallback(async (): Promise<void> => {
    await handlePostLike(postIdx)
    .then(({ status }: ISuccess) => {
      if (status === 200) {
        requestLikeList();
      }
    })

    .catch((error: IError) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [requestLikeList, handlePostLike]);

  const requestDeleteCount = useCallback(async (): Promise<void> => {
    const myLikeIndex: number = likeList.lastIndexOf(pressedLike);

    await handleDeleteLike(likeList[myLikeIndex].idx)
    .then(({ status }: ISuccess) => {
      if (status === 200) {
        requestLikeList();
      }
    })
    .catch((error: IError) => {
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
    <PostLike
      likeList={likeList}
      myInfo={myInfo}
      pressedLike={pressedLike}
      requestPostCount={requestPostCount}
      requestDeleteCount={requestDeleteCount}
    />
  );
});

export default LikeContainer;