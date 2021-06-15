import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IReplyModify } from 'interface/ReplyTypes';
import ISuccess from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import ReplyModify from 'components/Post/Reply/ReplyModify';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import { validateCreateReply } from 'validation/Reply/validationReply';

interface IReplyModifyContainerProps {
	replyIdx: number;
	commentIdx: number;
	replyValue: string;
	isModify: boolean;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	requestCommentList: () => Promise<void>;
	defaultPrivate: boolean;
}

const ReplyModifyContainer = observer(
	({
		replyIdx,
		commentIdx,
		replyValue,
		defaultPrivate,
		isModify,
		setIsModify,
		requestCommentList,
	}: IReplyModifyContainerProps) => {
		const { store } = useStores();
		const { handleModifyReply } = store.ReplyStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>(replyValue);
		const [isPrivate, setIsPrivate] = useState<boolean>(defaultPrivate);

		const onBlur = useCallback(() => {
			setIsModify(false);
		}, []);

		const requestModifyReply = useCallback(async () => {
			const data: IReplyModify = {
				idx: replyIdx,
				commentIdx,
				postIdx,
				contents,
				isPrivate,
			};

			if (!validateCreateReply(data)) {
				return;
			}

			await handleModifyReply(data)
				.then((response: ISuccess) => {
					if (response.status === 200) {
						onBlur();
						successToast('답글 수정을 성공하였습니다.');
						requestCommentList();
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		}, [replyIdx, commentIdx, postIdx, contents, isPrivate, onBlur, requestCommentList]);

		return (
			<ReplyModify
				contentsObject={GroupingState('contents', contents, setContents)}
				isPrivateObject ={GroupingState('isPrivate', isPrivate, setIsPrivate)}
				requestModifyReply={requestModifyReply}
				isModify={isModify}
				onBlur={onBlur}
			/>
		);
	}
);

export default ReplyModifyContainer;
