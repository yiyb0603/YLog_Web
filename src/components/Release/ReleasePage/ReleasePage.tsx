import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";

const style = require("./ReleasePage.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleasePageProps {

}

const ReleasePage = ({}: ReleasePageProps) => {
  return (
    <div className ={cx('ReleasePage')}>
      <div></div>
    </div>
  );
};

export default ReleasePage;
