import React, { Dispatch, SetStateAction } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import TitleInput from "components/Common/Input/TitleInput";
import ImageUpload from "lib/util/ImageUpload";
import dynamic from "next/dynamic";

const MarkdownForm = dynamic(() => import("components/Common/Markdown/MarkdownForm"));

const style = require("./ReleaseWriteForm.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseWriteFormProps {
  titleObject: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
  };

  contentsObject: {
    contents: string;
    setContents: Dispatch<SetStateAction<string>>;
  };

  requestFunction: () => void;
}

const ReleaseForm = ({ titleObject, contentsObject, requestFunction }: ReleaseWriteFormProps) => {
  const { title, setTitle } = titleObject;
  const { contents, setContents } = contentsObject;

  return (
    <div className={cx('ReleaseWriteForm')}>
			<div className={cx('ReleaseWriteForm-Top')}>
				<TitleInput title ={title} setTitle ={setTitle} />
			</div>

			<MarkdownForm contents={contents} setContents={setContents} requestImageUpload ={ImageUpload} />

			<div className={cx('ReleaseWriteForm-Button')}>
				{/* <button className={cx('CreateNotice-Button-Save')}>임시 저장</button> */}
				<button
					className={cx('ReleaseWriteForm-Button-Write')}
					onClick={requestFunction}
				>
					작성 완료
				</button>
			</div>
		</div>
  );
};

export default ReleaseForm;
