import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiFillLock } from 'react-icons/ai';

const style = require('./PrivateComment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PrivateCommentProps {
  type: number;
}

// type = 0: 댓글, 1: 답글
const PrivateComment = ({ type }: PrivateCommentProps): JSX.Element => {
  return (
    <div className={cx('PrivateComment')}>
      <AiFillLock className={cx('PrivateComment-Icon')} />
      <div className={cx('PrivateComment-Text')}>비공개 {type === 0 ? '댓글' : '답글'}입니다.</div>
    </div>
  );
};

export default PrivateComment;
