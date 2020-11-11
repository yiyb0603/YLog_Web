import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import TitleInput from 'components/Common/Input/TitleInput';
import ImageUpload from 'lib/util/ImageUpload';
import dynamic from 'next/dynamic';
import NoticeFormProps from './NoticeForm.types';

const MarkdownForm = dynamic(() => import('../../Common/Markdown/MarkdownForm'));

const style = require('./NoticeForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NoticeForm = ({
	titleObject,
	contentsObject,
	requestFunction,
}: NoticeFormProps) => {
	const { title, setTitle } = titleObject;
	const { contents, setContents } = contentsObject;

	return (
		<div className={cx('NoticeForm')}>
			<div className={cx('NoticeForm-Top')}>
				<TitleInput title ={title} setTitle ={setTitle} />
			</div>

			<MarkdownForm contents={contents} setContents={setContents} requestImageUpload ={ImageUpload} />

			<div className={cx('NoticeForm-Button')}>
				<button
					className={cx('NoticeForm-Button-Write')}
					onClick={requestFunction}
				>
					작성 완료
				</button>
			</div>
		</div>
	);
};

export default NoticeForm;
