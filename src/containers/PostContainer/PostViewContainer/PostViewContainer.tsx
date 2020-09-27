import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import IErrorTypes from 'interface/ErrorTypes';
import { IPostListTypes, IPostResponseTypes } from 'interface/PostTypes';
import { NextRouter, useRouter } from 'next/router';
import PostView from 'components/Post/PostView';
import { toast } from 'react-toastify';

const PostViewContainer = observer(() => {
	const { store } = useStores();
	const { handlePostView } = store.PostStore;
	const { handleCommentList } = store.CommentStore;

	const [postInfo, setPostInfo] = useState<IPostListTypes>({});

	const router: NextRouter = useRouter();
	const { idx } = router.query;

	const requestPostView = useCallback(async (): Promise<void> => {
		if (idx) {
			await handlePostView(idx)
				.then((response: IPostResponseTypes) => {
					if (response.status === 200) {
						setPostInfo(response.data.post);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		}
	}, [idx, handlePostView]);

	useEffect(() => {
		requestPostView();
	}, [requestPostView]);

	return (
		<>
			<PostView postInfo={postInfo} requestPostView={requestPostView} />
		</>
	);
});

export default PostViewContainer;
