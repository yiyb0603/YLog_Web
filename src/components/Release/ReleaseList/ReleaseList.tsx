import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";

const style = require("./ReleaseList.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseListProps {

}

const ReleaseList = ({}: ReleaseListProps) => {
  return (
    <div className ={cx('ReleaseList')}>
      <div></div>
    </div>
  );
};

export default ReleaseList;
