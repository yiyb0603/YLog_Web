import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import stringEllipsis from "lib/util/StringEllipsis";

const style = require("./Thumbnail.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ThumbnailProps {
  thumbnail: string;
  requestThumbnailUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Thumbnail = ({ thumbnail, requestThumbnailUpload }: ThumbnailProps) => {
  return (
    <div className ={cx('Thumbnail')}>
			<input type="file" onChange={requestThumbnailUpload} id ="fileButton" />
			<label htmlFor ="fileButton" className ={cx('Thumbnail-Button')}>썸네일 선택</label>
			<div className ={cx('Thumbnail-FileName')}>{thumbnail.length <= 0 ? '파일을 선택해주세요' : stringEllipsis(thumbnail, 30)}</div>
		</div>
  );
};

export default Thumbnail;
