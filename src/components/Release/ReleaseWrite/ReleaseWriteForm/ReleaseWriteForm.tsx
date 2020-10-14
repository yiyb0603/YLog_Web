import React, { Dispatch, SetStateAction } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import TitleInput from "components/Common/Input/TitleInput";
import MarkdownForm from "components/Common/Markdown/MarkdownForm";
import ImageUpload from "lib/util/ImageUpload";

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

  requestCreateRelease: () => Promise<void>;
}

const ReleaseWriteForm = ({ titleObject, contentsObject, requestCreateRelease }: ReleaseWriteFormProps) => {
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
					onClick={requestCreateRelease}
				>
					작성 완료
				</button>
			</div>
		</div>
  );
};

export default ReleaseWriteForm;
