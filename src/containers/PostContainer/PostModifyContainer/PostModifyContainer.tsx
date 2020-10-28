import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IPostRequestTypes, IPostResponseTypes } from 'interface/PostTypes';
import PostModify from 'components/Post/PostModify';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import PostModifyForm from 'components/Post/PostModify/PostModifyForm';
import IUploadTypes from 'interface/UploadTypes';
import { errorToast, successToast } from 'lib/Toast';
import { showAlert } from 'lib/SweetAlert';
import ImageUpload from 'lib/util/ImageUpload';
import { validationPostWrite } from 'validation/Post/validationPost';

const PostModifyContainer = observer(() => {
	const { store } = useStores();
	const { handleModifyPost, handlePostView } = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;
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

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleFileUpload]
	);

	const requestModifyPost = useCallback(async (): Promise<void> => {
		const request: IPostRequestTypes = {
			idx,
			title,
			introduction,
			contents,
			categoryIdx,
			thumbnail,
		};

		if (!validationPostWrite(request)) {
			return;
		}

		await handleModifyPost(request)
			.then((response: ISuccessTypes) => {
				if (response.status === 200) {
					showAlert('성공', '글 수정을 성공하였습니다.', 'success');
					router.push('/');
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [
		idx,
		title,
		introduction,
		contents,
		categoryIdx,
		thumbnail,
		handleModifyPost,
	]);

	useEffect(() => {
		handleCategoryList();
		if (idx) {
			handlePostView(idx).then((response: IPostResponseTypes) => {
				const { post } = response.data;
				setTitle(post.title!);
				setIntroduction(post.introduction!);
				setContents(post.contents!);
				setCategoryIdx(post.category_idx!);
				setThumbnail(post.thumbnail!);
			});
		}
	}, [handleCategoryList, handlePostView, idx]);

	const postModifyForm: JSX.Element = (
		<PostModifyForm
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
			requestImageUpload ={ImageUpload}
			requestModifyPost={requestModifyPost}
		/>
	);

	return <PostModify postModifyForm={postModifyForm} />;
});

export default PostModifyContainer;
