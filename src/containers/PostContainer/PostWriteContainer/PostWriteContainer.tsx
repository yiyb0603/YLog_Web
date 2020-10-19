import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import PostWrite from 'components/Post/PostWrite';
import { IPostRequestTypes } from 'interface/PostTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import PostWriteForm from 'components/Post/PostWrite/PostWriteForm';
import GroupingState from 'lib/util/GroupingState';
import { toast } from 'react-toastify';
import { showAlert } from 'lib/SweetAlert';
import { NextRouter, useRouter } from 'next/router';
import IUploadTypes from 'interface/UploadTypes';
import ImageUpload from 'lib/util/ImageUpload';

const PostWriteContainer = observer(() => {
	const { store } = useStores();
	const { handleWritePost } = store.PostStore;
	const { categoryList, handleCategoryList } = store.CategoryStore;
	const { handleFileUpload } = store.UploadStore;
	const router: NextRouter = useRouter();

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
					toast.error(message);
					return;
				});
		},
		[handleFileUpload]
	);

	const requestWritePost = useCallback(async (): Promise<void> => {
		const request: IPostRequestTypes = {
			title,
			introduction,
			contents,
			categoryIdx,
			thumbnail: thumbnail || null,
		};

		if (!title.trim() || !introduction.trim() || !contents.trim()) {
			toast.error('내용을 모두 입력해주세요!');
			return;
		}

		if (!categoryIdx) {
			toast.error('카테고리를 선택해주세요!');
			return;
		}

		await handleWritePost(request)
			.then((response: ISuccessTypes) => {
				if (response.status === 200) {
					showAlert('성공', '글 작성에 성공하였습니다.', 'success');
					router.push('/');
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
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

	const postWriteForm: JSX.Element = (
		<PostWriteForm
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
			requestWritePost={requestWritePost}
		/>
	);

	useEffect(() => {
		handleCategoryList();
	}, [handleCategoryList]);

	return <PostWrite postWriteForm={postWriteForm} />;
});

export default PostWriteContainer;
