import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import HomePost from 'components/Home/HomePost';
import IError from 'interface/ErrorTypes';
import { errorToast, successToast } from 'lib/Toast';
import ISuccess from 'interface/SuccessTypes';
import HomeLoading from 'components/Common/Loading/HomeLoading';
import { NextRouter, useRouter } from 'next/router';
import { IPost } from 'interface/PostTypes';

interface IPostContainerProps {
	posts: IPost[];
}

const PostContainer = observer(({
	posts,
}: IPostContainerProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const { keyword, topic, isTemp } = router.query;

	const { store } = useStores();
	const {
		isLoading,
		handlePostList,
		postList,
		handleDeletePost,
		handleSearchPosts,
	} = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;

	const filterPost: IPost[] = useMemo(() => {
		return topic ?
			postList.filter((post: IPost) => post.category!.idx === Number(topic) && !post.isTemp):

			isTemp ?
			postList.filter((post: IPost) => post.isTemp) :
			postList.filter((post: IPost) => !post.isTemp);
	}, [topic, postList, isTemp]);

	const requestInitialData = useCallback(async (): Promise<void> => {
		if (!keyword) {
			await handlePostList(posts && posts).catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		} else {
			await handleSearchPosts(keyword)
			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		}

		await handleCategoryList(keyword && keyword).catch((error: IError) => {
			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [handlePostList, handleCategoryList, handleSearchPosts, keyword, posts]);

	const requestDeletePost = useCallback(async (idx: number): Promise<void> => {
		await handleDeletePost(idx)
			.then((response: ISuccess) => {
				if (response.status === 200) {
					successToast('글 삭제를 성공하였습니다.');
					handleCategoryList(keyword && keyword);
				}
			})

			.catch((error: IError) => {
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
	}, [handleDeletePost, handleCategoryList, keyword, posts]);

	useEffect(() => {
		requestInitialData();
	}, [requestInitialData, topic, keyword]);

	if (isLoading) {
		return <HomeLoading />;
	}

	return (
		<HomePost
			filterPost={filterPost}
			categoryList={categoryList}
			requestDeletePost={requestDeletePost}
		/>
	);
});

export default PostContainer;
