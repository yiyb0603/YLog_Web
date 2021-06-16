import React, { Dispatch, SetStateAction, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import dynamic from 'next/dynamic';
import ImageUpload from 'lib/util/ImageUpload';
import TitleInput from 'components/Common/Input/TitleInput';

const MarkdownForm = dynamic(() => import('components/Common/Markdown/MarkdownForm'));

const style = require('./ReleaseForm.scss');
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

const ReleaseForm = ({
  titleObject,
  contentsObject,
  requestFunction,
}: ReleaseWriteFormProps): JSX.Element => {
  const { title, setTitle } = titleObject;
  const { contents, setContents } = contentsObject;

  return (
    <div className={cx('ReleaseWriteForm')}>
			<div className={cx('ReleaseWriteForm-Top')}>
				<TitleInput title ={title} setTitle ={setTitle} />
			</div>

			<MarkdownForm contents={contents} setContents={setContents} requestImageUpload ={ImageUpload} />

			<div className={cx('ReleaseWriteForm-Button')}>
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

export default memo(ReleaseForm);
