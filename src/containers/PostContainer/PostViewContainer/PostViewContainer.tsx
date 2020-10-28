import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import IErrorTypes from 'interface/ErrorTypes';
import { NextRouter, useRouter } from 'next/router';
import PostView from 'components/Post/PostView';
import { errorToast, successToast } from 'lib/Toast';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import PostLoading from 'components/Common/Loading/PostLoading';
import { IPostListTypes } from 'interface/PostTypes';

interface IPostViewContainerProps {
	post: IPostListTypes;
}

const PostViewContainer = observer(({ post }: IPostViewContainerProps) => {
	const { store } = useStores();
	const { handlePostView, postInfo, isLoading } = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const categoryName: ICategoryListTypes = categoryList.find(
		(category: ICategoryListTypes) => category.idx === postInfo.category_idx
	);

	const requestPostView = useCallback(async (): Promise<void> => {
		if (idx) {
			await handleCategoryList();
			await handlePostView(idx).catch((error: IErrorTypes) => {
				router.back();
				
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		}
	}, [idx, handleCategoryList, handlePostView]);

	useEffect(() => {
		requestPostView();
	}, [requestPostView]);

	return (
		<>
			{!isLoading && post.idx ? (
				<PostView postInfo={postInfo} categoryName={categoryName} />
			) : (
				<PostLoading />
			)}
		</>
	);
});

export default PostViewContainer;
