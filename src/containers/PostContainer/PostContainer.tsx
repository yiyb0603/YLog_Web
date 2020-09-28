import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import HomePost from 'components/Home/HomePost';
import IErrorTypes from 'interface/ErrorTypes';
import { toast } from 'react-toastify';
import ISuccessTypes from 'interface/SuccessTypes';
import { NextRouter, useRouter } from 'next/router';

const PostContainer = observer(() => {
	const router: NextRouter = useRouter();
	const { keyword } = router.query;

	const { store } = useStores();
	const {
		handlePostList,
		postList,
		handleDeletePost,
		handleSearchPosts,
	} = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;

	const requestInitialData = useCallback(async () => {
		if (!keyword) {
			await handlePostList().catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
		} else {
			await handleSearchPosts(keyword);
		}

		await handleCategoryList().catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			toast.error(message);
			return;
		});
	}, [handlePostList, handleCategoryList, keyword]);

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
	}, [requestInitialData, keyword]);

	return (
		<HomePost
			postList={postList}
			categoryList={categoryList}
			requestDeletePost={requestDeletePost}
		/>
	);
});

export default PostContainer;
