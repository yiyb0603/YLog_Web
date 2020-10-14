import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IPostResponseTypes } from 'interface/PostTypes';
import PostModify from 'components/Post/PostModify';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import PostModifyForm from 'components/Post/PostModify/PostModifyForm';
import IUploadTypes from 'interface/UploadTypes';
import { toast } from 'react-toastify';
import { showAlert } from 'lib/SweetAlert';
import ImageUpload from 'lib/util/ImageUpload';

const PostModifyContainer = observer(() => {
	const { store } = useStores();
	const { handleModifyPost, handlePostView } = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;
	const { handleFileUpload } = store.UploadStore;

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const [title, setTitle] = useState<string | undefined>('');
	const [introduction, setIntroduction] = useState<string | undefined>('');
	const [contents, setContents] = useState<string | undefined>('');
	const [categoryIdx, setCategoryIdx] = useState<number | undefined>(0);
	const [thumbnail, setThumbnail] = useState<string | null | undefined>(null);

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
					toast.error(message);
					return;
				});
		},
		[handleFileUpload]
	);

	const requestModifyPost = useCallback(async (): Promise<void> => {
		const request = {
			idx,
			title,
			introduction,
			contents,
			categoryIdx,
			thumbnail,
		};

		if (!title?.trim() || !contents?.trim() || !introduction?.trim()) {
			toast.error(`내용을 모두 입력해주세요!`);
			return;
		}

		if (!thumbnail) {
			toast.error('썸네일을 선택해주세요!');
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
				toast.error(message);
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
				setTitle(post.title);
				setIntroduction(post.introduction);
				setContents(post.contents);
				setCategoryIdx(post.category_idx);
			});
		}
	}, [handleCategoryList, handlePostView, idx]);

	const postModifyForm: JSX.Element = (
		<PostModifyForm
			titleObject={GroupingState('title', title, setTitle)}
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
