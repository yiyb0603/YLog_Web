import dynamic from 'next/dynamic';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { ClassNamesFn } from 'classnames/types';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import { SelectBox } from 'components/Common/SelectBox';

const style = require('./PostWriteForm.scss');
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
	ssr: false,
});
const mdParser: MarkdownIt = new MarkdownIt(/* Markdown-it options */);
const cx: ClassNamesFn = classNames.bind(style);

interface PostWriteFormProps {
	titleObject: {
		title: string;
		setTitle: Dispatch<SetStateAction<string>>;
	};

	introductionObject: {
		introduction: string;
		setIntroduction: Dispatch<SetStateAction<string>>;
	};

	contentsObject: {
		contents: string;
		setContents: Dispatch<SetStateAction<string>>;
	};

	categoryIdxObject: {
		categoryIdx: number;
		setCategoryIdx: Dispatch<SetStateAction<number>>;
	};

	categoryList: ICategoryListTypes[];
	requestWritePost: () => Promise<void>;
}

const PostWriteForm = ({
	titleObject,
	introductionObject,
	contentsObject,
	categoryIdxObject,
	categoryList,
	requestWritePost,
}: PostWriteFormProps) => {
	const { title, setTitle } = titleObject;
	const { introduction, setIntroduction } = introductionObject;
	const { contents, setContents } = contentsObject;
	const { setCategoryIdx } = categoryIdxObject;

	const handleImageUpload = (file: File, callback: (url: string) => void) => {
		const reader: FileReader = new FileReader();

		reader.onload = () => {
			// 	const convertBase64UrlToBlob = (urlData: any) => {
			// 		let arr = urlData.split(','),
			// 			mime = arr[0].match(/:(.*?);/)[1];
			// 		let bstr = atob(arr[1]);
			// 		let n = bstr.length;
			// 		let u8arr = new Uint8Array(n);
			// 		while (n--) {
			// 			u8arr[n] = bstr.charCodeAt(n);
			// 		}
			// 		return new Blob([u8arr], { type: mime });
			// 	};
			// 	const blob = convertBase64UrlToBlob(reader.result);
			// 	setTimeout(() => {
			//
			// setTimeout은 사진의 비동기 업로드를 시뮬레이션합니다.
			// 이미지 주소를 얻기위한 비동기 업로드 후 calback 콜백 (매개 변수는 imageUrl 문자열)을 실행하여 이미지 주소를 마크 다운에 씁니다
			// 		callback('https://avatars0.githubusercontent.com/u/21263805?s=40&v=4');
			// 	}, 1000);
			// };
			// reader.readAsDataURL(file);
		};
	};

	return (
		<div className={cx('PostWriteForm')}>
			<div className={cx('PostWriteForm-Top')}>
				<input
					className={cx('PostWriteForm-Top-Title')}
					type="text"
					placeholder="제목을 입력하세요..."
					value={title}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
				/>

				<SelectBox
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setCategoryIdx(Number(e.target.value))
					}
				>
					<option value={-1}>카테고리 선택</option>
					{categoryList.map((category: ICategoryListTypes) => {
						const { idx, category_name } = category;
						return <option value={idx}>{category_name}</option>;
					})}
				</SelectBox>
			</div>

			<div className={cx('PostWriteForm-Introduction')}>
				<input
					type="text"
					placeholder="소개를 입력하세요..."
					value={introduction}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setIntroduction(e.target.value)
					}
				/>
			</div>

			<MdEditor
				value={contents}
				onChange={({ text }) => setContents(text)}
				style={{ height: '80vh' }}
				renderHTML={(text) => mdParser.render(text)}
				onImageUpload={handleImageUpload}
				placeholder="내용을 입력하세요..."
			/>

			<div className={cx('PostWriteForm-Button')}>
				<button className={cx('PostWriteForm-Button-Save')}>임시 저장</button>
				<button
					className={cx('PostWriteForm-Button-Write')}
					onClick={requestWritePost}
				>
					작성 완료
				</button>
			</div>
		</div>
	);
};

export default PostWriteForm;
