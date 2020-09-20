import React, { ReactNode, ChangeEvent } from 'react';

import './SelectBox.scss';

interface ISelectBox {
  children?: ReactNode;
  className?: string;
  style?: object;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({ children, className, style, onChange }: ISelectBox) => {
  return (
    <select onChange={onChange} className={`select-box ${className}`} style={style}>
      {children}
    </select>
  );
}

export default SelectBox;