import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";

const style = require("./ReleaseModify.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseModifyProps {

}

const ReleaseModify = ({}: ReleaseModifyProps) => {
  return (
    <div className ={cx('ReleaseModify')}>
      <div></div>
    </div>
  );
};

export default ReleaseModify;
