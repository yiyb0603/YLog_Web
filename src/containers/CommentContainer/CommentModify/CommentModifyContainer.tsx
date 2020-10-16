import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import CommentModify from 'components/Post/Comment/CommentModify';
import GroupingState from 'lib/util/GroupingState';
import { NextRouter, useRouter } from 'next/router';
import useStores from 'lib/hooks/useStores';
import { ICommentRequestTypes } from 'interface/CommentTypes';
import IErrorTypes from 'interface/ErrorTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { toast } from 'react-toastify';

interface ICommentModifyContainerProps {
	commentIdx: number;
	commentValue: string;
	isModify: boolean;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	onBlur: () => void;
}

const CommentModifyContainer = observer(
	({
		commentIdx,
		commentValue,
		onBlur,
		setIsModify,
		isModify,
	}: ICommentModifyContainerProps) => {
		const { store } = useStores();
		const { handleCommentModify, handleCommentList } = store.CommentStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>(commentValue);

		const requestCommentModify = useCallback(async () => {
			const request: ICommentRequestTypes = {
				idx: commentIdx,
				postIdx,
				contents,
			};

			if (!contents.trim()) {
				toast.error(`내용을 입력해주세요!`);
				return;
			}

			await handleCommentModify(request)
				.then(async ({ status }: ISuccessTypes) => {
					if (status === 200) {
						onBlur();
						toast.success('댓글을 수정하였습니다.');
						await handleCommentList(postIdx);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		}, [commentIdx, postIdx, contents, handleCommentModify, handleCommentList]);

		return (
			<CommentModify
				contentsObject={GroupingState('contents', contents, setContents)}
				requestCommentModify={requestCommentModify}
				isModify={isModify}
				setIsModify={setIsModify}
				onBlur={onBlur}
			/>
		);
	}
);

export default CommentModifyContainer;
