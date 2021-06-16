import React, { ChangeEvent, Dispatch, memo, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./TitleInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TitleInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  width?: string;
}

const TitleInput = ({
  title,
  setTitle,
  width,
}: TitleInputProps) => {
  return (
    <input
      style={{ width }}
      className={cx('TitleInput')}
      type='text'
      placeholder='제목을 입력하세요...'
      value={title}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
      }
    />
  );
};

export default memo(TitleInput);
