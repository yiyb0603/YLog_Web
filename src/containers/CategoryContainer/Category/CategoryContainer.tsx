import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import Category from 'components/Home/Category';
import useStores from 'lib/hooks/useStores';
import IErrorTypes from 'interface/ErrorTypes';
import { errorToast, successToast } from 'lib/Toast';
import ISuccess from 'interface/SuccessTypes';
import { NextRouter, useRouter } from 'next/router';
import { ICategoryList } from 'interface/CategoryTypes';

interface ICategoryContainerProps {
	categories: ICategoryList[];
}

const CategoryContainer = observer(({ categories }: ICategoryContainerProps) => {
	const { store } = useStores();
	const router: NextRouter = useRouter();
	const { keyword } = router.query;

	const {
		handleCategoryList,
		categoryList,
		handleDeleteCategory,
	} = store.CategoryStore;

	const { postList } = store.PostStore;

	const requestInitialData = useCallback(async () => {
		await handleCategoryList(keyword && keyword)
		.catch((error: IErrorTypes) => {
			const { message } = error.response.data;
			errorToast(message);
			return;
		});
	}, [handleCategoryList, keyword]);

	const requestDeleteCategory = useCallback(
		async (idx: number) => {
			await handleDeleteCategory(idx)
				.then(async (response: ISuccess) => {
					if (response.status === 200) {
						successToast('카테고리를 삭제하였습니다.');
						await requestInitialData();
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		},
		[handleDeleteCategory, requestInitialData]
	);

	useEffect(() => {
		requestInitialData();
	}, [requestInitialData, keyword]);

	return (
		<Category
			categoryList={categoryList}
			requestDeleteCategory={requestDeleteCategory}
			postLength={postList.length}
		/>
	);
});

export default CategoryContainer;
