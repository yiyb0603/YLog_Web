import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import HomePost from 'components/Home/HomePost';
import IErrorTypes from 'interface/ErrorTypes';
import { errorToast, successToast } from 'lib/Toast';
import ISuccessTypes from 'interface/SuccessTypes';
import HomeLoading from 'components/Common/Loading/HomeLoading';
import { IPostListTypes } from 'interface/PostTypes';
import { NextRouter, useRouter } from 'next/router';

interface IPostContainerProps {
	posts: IPostListTypes[];
}

const PostContainer = observer(({ posts }: IPostContainerProps) => {
	const router: NextRouter = useRouter();
	const { keyword, topic } = router.query;

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
			await handlePostList(posts && posts).catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		} else {
			await handleSearchPosts(keyword)
			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		}

		await handleCategoryList(keyword && keyword).catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [handlePostList, handleCategoryList, handleSearchPosts, keyword, posts]);

	const requestDeletePost = useCallback(
		async (idx: number) => {
			await handleDeletePost(idx)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						successToast('글 삭제를 성공하였습니다.');
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

	const filterPost: IPostListTypes[] = topic ?
		postList.filter((post: IPostListTypes) => post.category_idx === Number(topic)) : postList;

	useEffect(() => {
		requestInitialData();
	}, [requestInitialData, topic, keyword]);

	return (
		<>
			{
				isLoading ? <HomeLoading /> :
				<HomePost
					filterPost={filterPost}
					categoryList={categoryList}
					requestDeletePost={requestDeletePost}
				/>
			}
		</>
	);
});

export default PostContainer;
