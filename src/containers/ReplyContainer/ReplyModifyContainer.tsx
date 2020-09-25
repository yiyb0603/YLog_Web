import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { NextRouter, useRouter } from 'next/router';
import { IReplyModifyTypes, IReplyTypes } from 'interface/ReplyTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import ReplyModify from 'components/Post/ReplyModify';
import GroupingState from 'lib/GroupingState';

const ReplyModifyContainer = observer(() => {
	const { store } = useStores();
	const { handleModifyReply } = store.ReplyStore;

	const idx = 1;
	const commentIdx = 2;
	const router: NextRouter = useRouter();
	const postIdx: number = Number(router.query.idx);
	const [contents, setContents] = useState<string>('');

	const requestModifyReply = useCallback(async () => {
		const data: IReplyModifyTypes = {
			idx,
			commentIdx,
			postIdx,
			contents,
		};

		await handleModifyReply(data)
			.then((response: ISuccessTypes) => {
				console.log(response);
			})

			.catch((error: IErrorTypes) => {
				console.log(error);
			});
	}, [idx, commentIdx, postIdx, contents]);

	return (
		<ReplyModify
			contentsObject={GroupingState('contents', contents, setContents)}
			requestModifyReply={requestModifyReply}
		/>
	);
});

export default ReplyModifyContainer;
