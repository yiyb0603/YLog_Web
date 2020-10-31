import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import HomePost from 'components/Home/HomePost';
import IErrorTypes from 'interface/ErrorTypes';
import { errorToast, successToast } from 'lib/Toast';
import ISuccessTypes from 'interface/SuccessTypes';
import { NextRouter, useRouter } from 'next/router';
import HomeLoading from 'components/Common/Loading/HomeLoading';
import { IPostListTypes } from 'interface/PostTypes';

const PostContainer = observer(({ posts }: any) => {
	const router: NextRouter = useRouter();
	const { keyword } = router.query;

	const { store } = useStores();
	const {
		isLoading,
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
				errorToast(message);
				return;
			});
		} else {
			await handleSearchPosts(keyword);
		}

		await handleCategoryList(keyword && keyword).catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [handlePostList, handleCategoryList, keyword]);

	const requestDeletePost = useCallback(
		async (idx: number) => {
			await handleDeletePost(idx)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						successToast('글 삭제를 성공하였습니다.');

						if (posts) {
							posts.filter((post: IPostListTypes) => post.idx !== idx);
						}
						handleCategoryList(keyword && keyword);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleDeletePost, handleCategoryList, keyword, posts]
	);

	useEffect(() => {
		requestInitialData();
	}, [requestInitialData, keyword]);

	return (
		<>
			{!isLoading ? (
				<HomePost
					postList={postList}
					categoryList={categoryList}
					requestDeletePost={requestDeletePost}
				/>
			) : (
				<HomeLoading />
			)}
		</>
	);
});

export default PostContainer;
