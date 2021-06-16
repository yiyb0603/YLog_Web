import React, { useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineLike } from 'react-icons/ai';
import { ILike } from 'interface/LikeTypes';
import { warningToast } from 'lib/Toast';
import { IToken } from 'interface/AuthTypes';

const style = require('./PostLike.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostLikeProps {
  likeList: ILike[];
  myInfo: IToken;
  pressedLike: ILike;
  requestPostCount: () => Promise<void>;
  requestDeleteCount: () => Promise<void>;
}

const PostLike = ({
  likeList,
  myInfo,
  pressedLike,
  requestPostCount,
  requestDeleteCount,
}: PostLikeProps) => {
  const requestFunction = useCallback((): void => {
    if (myInfo) {
      pressedLike ? requestDeleteCount() : requestPostCount();
      return;
    }

    warningToast('로그인 후 좋아요가 가능합니다.');
  }, [requestPostCount, requestDeleteCount, pressedLike]);

  return (
    <div className={cx('PostLike')}>
      <div className={cx('PostLike-Button', {
        'PostLike-Button-Pressed': pressedLike,
      })} onClick={requestFunction}>
        <AiOutlineLike className={cx('PostLike-Button-Icon')} />
        <div className={cx('PostLike-Button-Count')}>{likeList.length}</div>
      </div>
    </div>
  );
};

export default PostLike;
