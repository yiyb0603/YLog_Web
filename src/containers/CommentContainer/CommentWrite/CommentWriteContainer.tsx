import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import { ICommentRequestTypes } from 'interface/CommentTypes';
import ISuccess from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import CommentWrite from 'components/Post/Comment/CommentWrite';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import { validateCreateComment } from 'validation/Comment/validationComment';

const CommentWriteContainer = observer(() => {
	const { store } = useStores();
	const {
		handleCommentWrite,
		handleCommentList,
	} = store.CommentStore;
	const { handlePostView } = store.PostStore;

	const router: NextRouter = useRouter();
	const postIdx: number = Number(router.query.idx);

	const [contents, setContents] = useState<string>('');
	const [isPrivate, setIsPrivate] = useState<boolean>(false);

	const requestCommentWrite = useCallback(async () => {
		const request: ICommentRequestTypes = {
			postIdx,
			contents,
			isPrivate,
		};

		if (!validateCreateComment(request)) {
			return;
		}

		if (Number.isInteger(postIdx)) {
			await handleCommentWrite(request)
				.then(({ status }: ISuccess) => {
					if (status === 200) {
						successToast('댓글 작성에 성공하였습니다.');
						setContents('');
						handlePostView(postIdx);
						handleCommentList(postIdx);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		}
	}, [
		postIdx,
		contents,
		isPrivate,
		handlePostView,
		handleCommentList
	]);

	return (
		<CommentWrite
			contentsObject={GroupingState('contents', contents, setContents)}
			isPrivateObject={GroupingState('isPrivate', isPrivate, setIsPrivate)}
			requestCommentWrite={requestCommentWrite}
		/>
	);
});

export default CommentWriteContainer;
