import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import CommentModify from 'components/Post/Comment/CommentModify';
import GroupingState from 'lib/util/GroupingState';
import { NextRouter, useRouter } from 'next/router';
import useStores from 'lib/hooks/useStores';
import { ICommentRequestTypes } from 'interface/CommentTypes';
import IErrorTypes from 'interface/ErrorTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { errorToast, successToast } from 'lib/Toast';
import { validateCreateComment } from 'validation/Comment/validationComment';

interface ICommentModifyContainerProps {
	commentIdx: number;
	commentValue: string;
	isModify: boolean;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	onBlur: () => void;
	defaultPrivate: boolean;
}

const CommentModifyContainer = observer(
	({
		commentIdx,
		commentValue,
		onBlur,
		isModify,
		defaultPrivate
	}: ICommentModifyContainerProps) => {
		const { store } = useStores();
		const { handleCommentModify, handleCommentList } = store.CommentStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>(commentValue);
		const [isPrivate, setIsPrivate] = useState<boolean>(defaultPrivate);

		const requestCommentModify = useCallback(async () => {
			const request: ICommentRequestTypes = {
				idx: commentIdx,
				postIdx,
				contents,
				isPrivate
			};

			if (!validateCreateComment(request)) {
				return;
			}

			await handleCommentModify(request)
				.then(async ({ status }: ISuccessTypes) => {
					if (status === 200) {
						onBlur();
						successToast('댓글을 수정하였습니다.');
						await handleCommentList(postIdx);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		}, [commentIdx, postIdx, contents, isPrivate, handleCommentModify, handleCommentList]);

		return (
			<CommentModify
				contentsObject={GroupingState('contents', contents, setContents)}
				isPrivateObject ={GroupingState('isPrivate', isPrivate, setIsPrivate)}
				requestCommentModify={requestCommentModify}
				isModify={isModify}
				onBlur={onBlur}
			/>
		);
	}
);

export default CommentModifyContainer;
