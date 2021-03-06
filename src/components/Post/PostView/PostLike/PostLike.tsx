import React, { useCallback } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import { AiOutlineLike } from 'react-icons/ai';
import { ILikeTypes } from "interface/LikeTypes";
import getMyInfo from "lib/util/getMyInfo";
import { warningToast } from "lib/Toast";

const style = require("./PostLike.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface PostLikeProps {
  likeList: ILikeTypes[];
  requestPostCount: () => Promise<void>;
  requestDeleteCount: () => Promise<void>;
}

const PostLike = ({ likeList, requestPostCount, requestDeleteCount }: PostLikeProps) => {
  const myInfo = getMyInfo();
  const isPressed: number = likeList && likeList.findIndex((like: ILikeTypes) => like.user_idx === myInfo.idx);

  const requestFunction = useCallback((): void => {
    if (myInfo) {
      isPressed > -1 ? requestDeleteCount() : requestPostCount();
      return;
    }

    warningToast("로그인 후 좋아요가 가능합니다.");
  }, [requestPostCount, requestDeleteCount, isPressed]);

  return (
    <div className={cx('PostLike')}>
      <div className={cx('PostLike-Button', {
        'PostLike-Button-Pressed': isPressed > -1
      })} onClick={requestFunction}>
        <AiOutlineLike className={cx('PostLike-Button-Icon')} />
        <div className={cx('PostLike-Button-Count')}>{likeList.length}</div>
      </div>
    </div>
  );
};

export default PostLike;
