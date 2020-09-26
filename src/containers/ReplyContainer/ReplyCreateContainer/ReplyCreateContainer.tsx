import React, { useCallback, useState } from 'react';
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
}

const ReplyCreateContainer = observer(
	({ commentIdx }: IReplyCreateContainerProps) => {
		const { store } = useStores();
		const { handleCreateReply, handleReplyList } = store.ReplyStore;

		const router: NextRouter = useRouter();
		const postIdx: number = Number(router.query.idx);

		const [contents, setContents] = useState<string>('');

		const requestCreateReply = useCallback(async () => {
			const request: IReplyModifyTypes = {
				postIdx,
				commentIdx,
				contents,
			};

			await handleCreateReply(request)
				.then((response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('답글 작성을 성공하였습니다.');
						handleReplyList(postIdx);
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
					return;
				});
		}, [postIdx, commentIdx, contents, handleCreateReply, handleReplyList]);

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
