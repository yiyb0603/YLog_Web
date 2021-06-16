import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import IError from 'interface/ErrorTypes';
import { NextRouter, useRouter } from 'next/router';
import PostView from 'components/Post/PostView';
import { errorToast } from 'lib/Toast';
import { ICategory } from 'interface/CategoryTypes';
import PostLoading from 'components/Common/Loading/PostLoading';
import isAdmin from 'lib/util/isAdmin';
import { IPost } from 'interface/PostTypes';

interface IPostViewContainerProps {
	post: IPost;
}

const PostViewContainer = observer(({ post }: IPostViewContainerProps): JSX.Element => {
	const { store } = useStores();
	const { handlePostView, postInfo, isLoading } = store.PostStore;
	const { handleCategoryList, categoryList } = store.CategoryStore;

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const categoryName: ICategory = categoryList.find(
		(category: ICategory) => category.idx === postInfo.category_idx
	);

	const requestPostView = useCallback(async (): Promise<void> => {
		if (idx) {
			await handleCategoryList();
			await handlePostView(idx, post)
			.catch((error: IError) => {
				router.back();
				
				const { message } = error.response.data;
				errorToast(message);
				return;
			});
		}
	}, [idx, post, handleCategoryList, handlePostView]);

	useEffect(() => {
		if (post.isTemp && (!isAdmin())) {
			router.back();
			return;
		}

		requestPostView();
	}, [requestPostView, post]);

	return (
		<>
			{!isLoading || Object.keys(post).length > 0 ? (
				<PostView
					postInfo={post || postInfo}
					commentCount={postInfo.commentCount}
					categoryName={categoryName}
				/>
			) : (
				<PostLoading />
			)}
		</>
	);
});

export default PostViewContainer;
