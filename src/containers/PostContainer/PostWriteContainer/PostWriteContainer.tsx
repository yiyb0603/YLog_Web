import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import PostWrite from 'components/Post/PostWrite';
import { IPostRequestTypes } from 'interface/PostTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import PostWriteForm from 'components/Post/PostWrite/PostWriteForm';
import GroupingState from 'lib/GroupingState';
import { toast } from 'react-toastify';
import { showAlert } from 'lib/SweetAlert';
import { NextRouter, useRouter } from 'next/router';

const PostWriteContainer = observer(() => {
	const { store } = useStores();
	const { handleWritePost } = store.PostStore;
	const { categoryList, handleCategoryList } = store.CategoryStore;
	const router: NextRouter = useRouter();

	const [title, setTitle] = useState<string>('');
	const [contents, setContents] = useState<string>('');
	const [categoryIdx, setCategoryIdx] = useState<number>(0);
	// const [thumbnail, setThumbnail] = useState<string>('');

	const requestWritePost = useCallback(async (): Promise<void> => {
		const request: IPostRequestTypes = {
			title,
			contents,
			categoryIdx,
			thumbnail: null,
		};

		await handleWritePost(request)
			.then((response: ISuccessTypes) => {
				if (response.status === 200) {
					showAlert('성공', '글 작성에 성공하였습니다.', 'success');
					router.push('/');
				}
			})

			.catch((error: IErrorTypes) => {
				const { message } = error.response.data;
				toast.error(message);
				return;
			});
	}, [title, contents, categoryIdx, handleWritePost, showAlert]);

	const postWriteForm: JSX.Element = (
		<PostWriteForm
			titleObject={GroupingState('title', title, setTitle)}
			contentsObject={GroupingState('contents', contents, setContents)}
			categoryIdxObject={GroupingState(
				'categoryIdx',
				categoryIdx,
				setCategoryIdx
			)}
			categoryList={categoryList}
			requestWritePost={requestWritePost}
		/>
	);

	useEffect(() => {
		handleCategoryList();
	}, [handleCategoryList]);

	return <PostWrite postWriteForm={postWriteForm} />;
});

export default PostWriteContainer;
