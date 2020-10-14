import React, { Dispatch, SetStateAction } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import TitleInput from "components/Common/Input/TitleInput";
import MarkdownForm from "components/Common/Markdown/MarkdownForm";
import ImageUpload from "lib/util/ImageUpload";

const style = require("./ReleaseModifyForm.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseModifyFormProps {
  titleObject: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
  };

  contentsObject: {
    contents: string;
    setContents: Dispatch<SetStateAction<string>>;
  };

  requestModifyRelease: () => Promise<void>;
}

const ReleaseModifyForm = ({ titleObject, contentsObject, requestModifyRelease }: ReleaseModifyFormProps) => {
  const { title, setTitle } = titleObject;
  const { contents, setContents } = contentsObject;

  return (
    <div className={cx('ReleaseModifyForm')}>
			<div className={cx('ReleaseModifyForm-Top')}>
				<TitleInput title ={title} setTitle ={setTitle} />
			</div>

			<MarkdownForm contents={contents} setContents={setContents} requestImageUpload ={ImageUpload} />

			<div className={cx('ReleaseModifyForm-Button')}>
				<button
					className={cx('ReleaseModifyForm-Button-Write')}
					onClick={requestModifyRelease}
				>
					작성 완료
				</button>
			</div>
		</div>
  );
};

export default ReleaseModifyForm;
