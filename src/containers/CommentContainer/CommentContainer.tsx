import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { NextRouter, useRouter } from 'next/router';
import IErrorTypes from 'interface/ErrorTypes';
import Comment from 'components/Post/Comment';
import { toast } from 'react-toastify';
import ISuccessTypes from 'interface/SuccessTypes';

interface ICommentContainerProps {
	requestPostView: (idx: number) => Promise<void>;
}

const CommentContainer = observer(
	({ requestPostView }: ICommentContainerProps) => {
		const { store } = useStores();
		const {
			handleCommentList,
			handleCommentDelete,
			commentReplyList,
		} = store.CommentStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const requestCommentList = useCallback(async () => {
			await handleCommentList(postIdx).catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
		}, [handleCommentList, postIdx]);

		const requestCommentDelete = useCallback(
			async (idx: number) => {
				await handleCommentDelete(idx)
					.then(async (response: ISuccessTypes) => {
						if (response.status === 200) {
							toast.success('댓글을 삭제하였습니다.');
							await requestCommentList();
							await requestPostView(postIdx);
						}
					})

					.catch((error: IErrorTypes) => {
						const { message } = error.response.data;
						toast.error(message);
						return;
					});
			},
			[handleCommentDelete, requestPostView, postIdx]
		);

		useEffect(() => {
			if (Number.isInteger(postIdx)) {
				requestCommentList();
			}
		}, [requestCommentList, postIdx]);

		return (
			<Comment
				commentReplyList={commentReplyList}
				requestCommentDelete={requestCommentDelete}
			/>
		);
	}
);

export default CommentContainer;
