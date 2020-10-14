import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";

const style = require("./ReleaseList.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseListProps {
  releaseLists: JSX.Element[];
}

const ReleaseList = ({ releaseLists }: ReleaseListProps) => {
  return (
    <div className ={cx('ReleaseList')}>
      {releaseLists}
    </div>
  );
};

export default ReleaseList;
