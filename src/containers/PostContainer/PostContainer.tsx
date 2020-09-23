import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import HomePost from 'components/Home/HomePost';
import IErrorTypes from 'interface/ErrorTypes';
import { toast } from 'react-toastify';
import ISuccessTypes from 'interface/SuccessTypes';

const PostContainer = observer(() => {
	const { store } = useStores();
	const { handlePostList, postList, handleDeletePost } = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;

	const requestInitialData = useCallback(async () => {
		await handlePostList().catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			toast.error(message);
			return;
		});

		await handleCategoryList().catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			toast.error(message);
			return;
		});
	}, [handlePostList, handleCategoryList]);

	const requestDeletePost = useCallback(
		async (idx: number) => {
			await handleDeletePost(idx)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('글 삭제를 성공하였습니다.');
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		},
		[handleDeletePost]
	);

	useEffect(() => {
		requestInitialData();
	}, [requestInitialData]);

	return (
		<HomePost
			postList={postList}
			categoryList={categoryList}
			requestDeletePost={requestDeletePost}
		/>
	);
});

export default PostContainer;
