import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import HomePost from 'components/Home/HomePost';
import IErrorTypes from 'interface/ErrorTypes';
import { toast } from 'react-toastify';

const PostContainer = observer(() => {
	const { store } = useStores();
	const { handlePostList, postList } = store.PostStore;
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

	useEffect(() => {
		requestInitialData();
	}, [requestInitialData]);

	return <HomePost postList={postList} categoryList={categoryList} />;
});

export default PostContainer;
