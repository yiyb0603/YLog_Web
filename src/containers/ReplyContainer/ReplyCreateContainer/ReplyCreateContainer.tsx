import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IReplyModify } from 'interface/ReplyTypes';
import ISuccess from 'interface/SuccessTypes';
import IError from 'interface/ErrorTypes';
import ReplyWrite from 'components/Post/Reply/ReplyWrite';
import { errorToast, successToast } from 'lib/Toast';
import { validateCreateReply } from 'validation/Reply/validationReply';
import GroupingState from 'lib/util/GroupingState';

interface IReplyCreateContainerProps {
	commentIdx: number;
	setIsReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyCreateContainer = observer(
	({
		commentIdx,
		setIsReply,
	}: IReplyCreateContainerProps) => {
		const { store } = useStores();
		const { handleCreateReply } = store.ReplyStore;
		const { handlePostView } = store.PostStore;
		const { handleCommentList } = store.CommentStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>('');
		const [isPrivate, setIsPrivate] = useState<boolean>(false);

		const requestCreateReply = useCallback(async () => {
			const request: IReplyModify = {
				postIdx,
				commentIdx,
				contents,
				isPrivate
			};

			if (!validateCreateReply(request)) {
				return;
			}

			await handleCreateReply(request)
				.then(async (response: ISuccess) => {
					if (response.status === 200) {
						setIsReply(true);
						setContents('');
						successToast('답글 작성을 성공하였습니다.');
						await handlePostView(postIdx);
						await handleCommentList(postIdx);
					}
				})

				.catch((error: IError) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		}, [
			postIdx,
			commentIdx,
			contents,
			isPrivate,
			handleCreateReply,
			handleCommentList,
			handlePostView,
			setIsReply,
		]);

		return (
			<ReplyWrite
				contentsObject ={GroupingState('contents', contents, setContents)}
				isPrivateObject ={GroupingState('isPrivate', isPrivate, setIsPrivate)}
				requestCreateReply={requestCreateReply}
			/>
		);
	}
);

export default ReplyCreateContainer;
