import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import IError from 'interface/ErrorTypes';
import Comment from 'components/Post/Comment';
import { errorToast, successToast } from 'lib/Toast';
import ISuccess from 'interface/SuccessTypes';

const CommentContainer = observer((): JSX.Element => {
	const { store } = useStores();
	const {
		handleCommentList,
		handleCommentDelete,
		commentReplyList,
		isLoading,
	} = store.CommentStore;
	const { handleDeleteReply } = store.ReplyStore;
	const { handlePostView } = store.PostStore;

	const router: NextRouter = useRouter();
	const postIdx: number = Number(router.query.idx);

	const requestCommentList = useCallback(async () => {
		if (Number.isInteger(postIdx)) {
			await handleCommentList(postIdx)
			.catch((error: IError) => {
				console.log(error);
			});
		}
	}, [handleCommentList, postIdx]);

	const requestCommentDelete = useCallback(
		async (idx: number) => {
			await handleCommentDelete(idx)
				.then(async ({ status }: ISuccess) => {
					if (status === 200) {
						successToast('댓글을 삭제하였습니다.');
						await handlePostView(postIdx);
						await handleCommentList(postIdx);
					}
				})

				.catch((error: IError) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
			},
		[handleCommentDelete, handleCommentList, handlePostView, postIdx]
	);

	const requestDeleteReply = useCallback(
		async (idx: number) => {
			await handleDeleteReply(idx)
				.then(async (response: ISuccess) => {
					if (response.status === 200) {
						successToast('답글 삭제를 성공하였습니다.');
						await handlePostView(postIdx);
						await handleCommentList(postIdx);
					}
				})

				.catch((error: IError) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleDeleteReply, handleCommentList, handlePostView]
	);

	useEffect(() => {
		requestCommentList();
	}, [requestCommentList]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Comment
			commentReplyList={commentReplyList}
			requestCommentDelete={requestCommentDelete}
			requestDeleteReply={requestDeleteReply}
			requestCommentList={requestCommentList}
		/>
	);
});

export default CommentContainer;
