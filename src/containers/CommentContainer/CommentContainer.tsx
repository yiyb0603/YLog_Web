import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import IErrorTypes from 'interface/ErrorTypes';
import Comment from 'components/Post/Comment';
import { toast } from 'react-toastify';
import ISuccessTypes from 'interface/SuccessTypes';

const CommentContainer = observer(() => {
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
			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
		}
	}, [handleCommentList, postIdx]);

	const requestCommentDelete = useCallback(
		async (idx: number) => {
			await handleCommentDelete(idx)
				.then(async ({ status }: ISuccessTypes) => {
					if (status === 200) {
						toast.success('댓글을 삭제하였습니다.');
						await requestCommentList();
						await handlePostView(postIdx);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
			},
		[handleCommentDelete, requestCommentList, handlePostView, postIdx]
	);

	const requestDeleteReply = useCallback(
		async (idx: number) => {
			await handleDeleteReply(idx)
				.then(async (response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('답글 삭제를 성공하였습니다.');
						await requestCommentList();
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		},
		[handleDeleteReply, requestCommentList]
	);

	useEffect(() => {
		requestCommentList();
	}, [requestCommentList]);

	return (
		<>
			{isLoading ? (
				<div>Loading..</div>
			) : (
				<Comment
					commentReplyList={commentReplyList}
					requestCommentDelete={requestCommentDelete}
					requestDeleteReply={requestDeleteReply}
					requestCommentList={requestCommentList}
				/>
			)}
		</>
	);
});

export default CommentContainer;
