import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IReplyModifyTypes, IReplyTypes } from 'interface/ReplyTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import ReplyModify from 'components/Post/Reply/ReplyModify';
import GroupingState from 'lib/GroupingState';
import { toast } from 'react-toastify';

interface IReplyModifyContainerProps {
	replyIdx: number;
	commentIdx: number;
	replyValue: string;
	isModify: boolean;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	requestCommentList: () => Promise<void>;
}

const ReplyModifyContainer = observer(
	({
		replyIdx,
		commentIdx,
		replyValue,
		isModify,
		setIsModify,
		requestCommentList,
	}: IReplyModifyContainerProps) => {
		const { store } = useStores();
		const { handleModifyReply } = store.ReplyStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);
		const [contents, setContents] = useState<string>(replyValue);

		const onBlur = useCallback(() => {
			setIsModify(false);
		}, []);

		const requestModifyReply = useCallback(async () => {
			const data: IReplyModifyTypes = {
				idx: replyIdx,
				commentIdx,
				postIdx,
				contents,
			};

			await handleModifyReply(data)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						onBlur();
						toast.success('답글 수정을 성공하였습니다.');
						requestCommentList();
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		}, [replyIdx, commentIdx, postIdx, contents, onBlur, requestCommentList]);

		return (
			<ReplyModify
				contentsObject={GroupingState('contents', contents, setContents)}
				requestModifyReply={requestModifyReply}
				isModify={isModify}
				setIsModify={setIsModify}
				onBlur={onBlur}
			/>
		);
	}
);

export default ReplyModifyContainer;
