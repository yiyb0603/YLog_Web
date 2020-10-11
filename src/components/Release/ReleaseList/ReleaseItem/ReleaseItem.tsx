import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";

const style = require("./ReleaseItem.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseItemProps {

}

const ReleaseItem = ({}: ReleaseItemProps) => {
  return (
    <div className ={cx('ReleaseItem')}>
      <div></div>
    </div>
  );
};

export default ReleaseItem;
