import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { NextRouter, useRouter } from 'next/router';
import { ICommentRequestTypes } from 'interface/CommentTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import CommentWrite from 'components/Post/Comment/CommentWrite';
import GroupingState from 'lib/GroupingState';
import { toast } from 'react-toastify';

interface ICommentWriteContainerProps {
	requestPostView: () => Promise<void>;
}

const CommentWriteContainer = observer(
	({ requestPostView }: ICommentWriteContainerProps) => {
		const { store } = useStores();
		const {
			handleCommentWrite,
			handleCommentList,
			commentReplyList,
		} = store.CommentStore;
		const { handleReplyList } = store.ReplyStore;
		const { handlePostView } = store.PostStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>('');

		const requestCommentWrite = useCallback(async () => {
			const request: ICommentRequestTypes = {
				postIdx,
				contents,
			};

			if (!contents.trim()) {
				toast.error('내용을 입력해주세요!');
				return;
			}

			if (Number.isInteger(postIdx)) {
				await handleCommentWrite(request)
					.then(async (response: ISuccessTypes) => {
						if (response.status === 200) {
							toast.success('댓글 작성에 성공하였습니다.');
							setContents('');
							await requestPostView();
							await handleCommentList(postIdx);
						}
					})

					.catch((error: IErrorTypes) => {
						const { message } = error.response.data;
						toast.error(message);
						return;
					});
			}
		}, [
			postIdx,
			contents,
			handleCommentWrite,
			handleCommentList,
			handlePostView,
			requestPostView,
			commentReplyList,
		]);

		return (
			<CommentWrite
				contentsObject={GroupingState('contents', contents, setContents)}
				requestCommentWrite={requestCommentWrite}
			/>
		);
	}
);

export default CommentWriteContainer;
