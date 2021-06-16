import React, { ChangeEvent, useCallback, useEffect, useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { IPostDto, IPostResponseTypes } from 'interface/PostTypes';
import ISuccess from 'interface/SuccessTypes';
import IError from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import { errorToast } from 'lib/Toast';
import { showAlert } from 'lib/SweetAlert';
import { NextRouter, useRouter } from 'next/router';
import IUploadTypes from 'interface/UploadTypes';
import ImageUpload from 'lib/util/ImageUpload';
import { validationPostWrite } from 'validation/Post/validationPost';
import PostForm from 'components/Post/PostForm/PostForm';
import PostFormTemplate from 'components/Post/PostForm';

const PostFormContainer = observer(() => {
	const { store } = useStores();
	const { handleWritePost, handleModifyPost, handlePostView } = store.PostStore;
	const { categoryList, handleCategoryList } = store.CategoryStore;
	const { handleFileUpload } = store.UploadStore;
	const router: NextRouter = useRouter();
	const idx: number = Number(router.query.idx);

	const [title, setTitle] = useState<string>('');
	const [introduction, setIntroduction] = useState<string>('');
	const [contents, setContents] = useState<string>('');
	const [categoryIdx, setCategoryIdx] = useState<number>(0);
	const [thumbnail, setThumbnail] = useState<string>('');

	const requestThumbnailUpload = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;
			const formData: FormData = new FormData();
			formData.append('files', files![0]);

			await handleFileUpload(formData)
				.then((response: IUploadTypes) => {
					setThumbnail(response.data.files[0]);
				})

				.catch((error: IError) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleFileUpload]
	);

	const requestWritePost = useCallback(async (isTemp: boolean): Promise<void> => {
		const request: IPostDto = {
			title,
			introduction,
			contents,
			categoryIdx,
			thumbnail: thumbnail || null,
			isTemp,
		};

		if (!validationPostWrite(request)) {
			return;
		}

		await handleWritePost(request)
			.then((response: ISuccess) => {
				if (response.status === 200) {
					showAlert('성공', '글 작성에 성공하였습니다.', 'success');
					router.push('/');
				}
			})

			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [
		title,
		contents,
		categoryIdx,
		thumbnail,
		introduction,
		handleWritePost,
		showAlert,
	]);

	const requestModifyPost = useCallback(async (isTemp: boolean): Promise<void> => {
		const request = {
			idx,
			title,
			introduction,
			contents,
			categoryIdx,
			thumbnail: thumbnail || null,
			isTemp,
		};
		console.log(isTemp);

		await handleModifyPost(request)
			.then((response: ISuccess) => {
				if (response.status === 200) {
					showAlert('성공', '글 수정을 성공하였습니다.', 'success');
					router.push('/');
				}
			})

			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [idx, title, introduction, contents, categoryIdx, thumbnail, handleModifyPost, router]);

	const clickButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
		const { innerText } = e.currentTarget;
		const TEMP_TEXT: string = "임시 저장";
		let isTemp: boolean = innerText === TEMP_TEXT ? true : false

		if (idx) {
			requestModifyPost(isTemp);
			return;
		}

		requestWritePost(isTemp);
	}, [idx, requestModifyPost, requestWritePost]);

	const postWriteForm: JSX.Element = (
		<PostForm
			titleObject={GroupingState('title', title, setTitle)}
			thumbnailObject={GroupingState('thumbnail', thumbnail, setThumbnail)}
			introductionObject={GroupingState(
				'introduction',
				introduction,
				setIntroduction
			)}
			contentsObject={GroupingState('contents', contents, setContents)}
			categoryIdxObject={GroupingState(
				'categoryIdx',
				categoryIdx,
				setCategoryIdx
			)}
			categoryList={categoryList}
			requestThumbnailUpload={requestThumbnailUpload}
			requestImageUpload={ImageUpload}
			requestWritePost={clickButton}
		/>
	);

	useEffect(() => {
		handleCategoryList();

		if (idx) {
			handlePostView(idx)
				.then((response: IPostResponseTypes) => {
					const { post } = response.data;
					setTitle(post.title!);
					setIntroduction(post.introduction!);
					setContents(post.contents!);
					setCategoryIdx(post.category.idx);
					setThumbnail(post.thumbnail!);
				});
		}
	}, [idx, handlePostView, handleCategoryList]);

	return <PostFormTemplate postWriteForm={postWriteForm} />;
});

export default PostFormContainer;
