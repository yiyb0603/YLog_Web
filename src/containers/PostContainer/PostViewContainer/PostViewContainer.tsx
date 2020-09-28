import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import IErrorTypes from 'interface/ErrorTypes';
import { NextRouter, useRouter } from 'next/router';
import PostView from 'components/Post/PostView';
import { toast } from 'react-toastify';

const PostViewContainer = observer(() => {
	const { store } = useStores();
	const { handlePostView, postInfo } = store.PostStore;

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const requestPostView = useCallback(async (): Promise<void> => {
		if (idx) {
			await handlePostView(idx).catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
		}
	}, [idx, handlePostView]);

	useEffect(() => {
		requestPostView();
	}, [requestPostView]);

	return <PostView postInfo={postInfo} requestPostView={requestPostView} />;
});

export default PostViewContainer;
