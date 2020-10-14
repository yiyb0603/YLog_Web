import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import parseTime from "lib/TimeCounting";

const style = require("./ReleaseItem.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseItemProps {
  idx: number;
  title: string;
  writer: string;
  createdAt: string | Date;
  updatedAt: Date | null;
}

const ReleaseItem = ({ idx, title, writer, createdAt, updatedAt }: ReleaseItemProps) => {
  return (
    <div className ={cx('ReleaseItem')}>
      <div className ={cx('ReleaseItem-Left')}>
        <div className ={cx('ReleaseItem-Left-Time')}>{parseTime(createdAt)}</div>
        <div className ={cx('ReleaseItem-Left-Idx')}>#{idx}</div>
        <div className ={cx('ReleaseItem-Left-Title')}>{title}</div>
      </div>

      <div className ={cx('ReleaseItem-Right')}>{writer}</div>
      
    </div>
  );
};

export default ReleaseItem;
