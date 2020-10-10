import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";

const style = require("./ReleaseWrite.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseWriteProps {

}

const ReleaseWrite = ({}: ReleaseWriteProps) => {
  return (
    <div className ={cx('ReleaseWrite')}>
      <div></div>
    </div>
  );
};

export default ReleaseWrite;
