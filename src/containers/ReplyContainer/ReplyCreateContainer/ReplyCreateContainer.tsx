import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IReplyModifyTypes } from 'interface/ReplyTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import ReplyWrite from 'components/Post/Reply/ReplyWrite';
import { toast } from 'react-toastify';

interface IReplyCreateContainerProps {
	commentIdx: number;
	requestCommentList: (() => Promise<void>) | undefined;
	setIsReply: Dispatch<SetStateAction<boolean>>;
}

const ReplyCreateContainer = observer(
	({
		commentIdx,
		requestCommentList,
		setIsReply,
	}: IReplyCreateContainerProps) => {
		const { store } = useStores();
		const { handleCreateReply } = store.ReplyStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>('');

		const requestCreateReply = useCallback(async () => {
			const request: IReplyModifyTypes = {
				postIdx,
				commentIdx,
				contents,
			};

			if (!contents.trim()) {
				toast.error('내용을 입력해주세요!');
				return;
			}

			await handleCreateReply(request)
				.then(async (response: ISuccessTypes) => {
					if (response.status === 200) {
						setIsReply(true);
						setContents('');
						toast.success('답글 작성을 성공하였습니다.');
						await requestCommentList!();
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		}, [
			postIdx,
			commentIdx,
			contents,
			handleCreateReply,
			requestCommentList,
			setIsReply,
		]);

		return (
			<ReplyWrite
				contents={contents}
				setContents={setContents}
				requestCreateReply={requestCreateReply}
			/>
		);
	}
);

export default ReplyCreateContainer;
