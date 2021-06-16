import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./WriteButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface WriteButtonProps {
  width?: string;
  nextFunction: () => void;
  children?: ReactNode;
}

const WriteButton = ({
  width,
  nextFunction,
  children,
}: WriteButtonProps): JSX.Element => {
  return (
    <button
      style={{ width: width && width }}
      className={cx('WriteButton')}
      onClick={nextFunction}
    >
      {children}
    </button>
  );
};

export default WriteButton;
