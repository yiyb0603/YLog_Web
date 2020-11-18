import React, { useCallback } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { ILikeTypes } from "interface/LikeTypes";
import getMyInfo from "lib/util/getMyInfo";

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

  const requestFunction = useCallback(() => {
    isPressed > -1 ? requestDeleteCount() : requestPostCount();
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
