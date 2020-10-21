import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import { ICommentRequestTypes } from 'interface/CommentTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import CommentWrite from 'components/Post/Comment/CommentWrite';
import GroupingState from 'lib/util/GroupingState';
import { toast } from 'react-toastify';

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

		if (!contents.trim()) {
			toast.error('내용을 입력해주세요!');
			return;
		}

		if (Number.isInteger(postIdx)) {
			await handleCommentWrite(request)
				.then(({ status }: ISuccessTypes) => {
					if (status === 200) {
						toast.success('댓글 작성에 성공하였습니다.');
						setContents('');
						handlePostView(postIdx);
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
		isPrivate,
		handleCommentList,
		handlePostView,
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
