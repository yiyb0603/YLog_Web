import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import CreateCategory from 'components/Home/Category/CreateCategory';
import useStores from 'lib/hooks/useStores';
import ISuccess from 'interface/SuccessTypes';
import IError from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';
import { ICategory } from 'interface/CategoryTypes';

interface CreateCategoryContainerProps {
	handleCloseModal: () => void;
}

const CreateCategoryContainer = observer(
	({ handleCloseModal }: CreateCategoryContainerProps): JSX.Element => {
		const { store } = useStores();
		const { handleCreateCategory, handleCategoryList } = store.CategoryStore;

		const [categoryName, setCategoryName] = useState<string>('');

		const requestCreateCategory = useCallback(async () => {
			const request: ICategory = {
				categoryName,
			};

			if (!categoryName.trim()) {
				errorToast('내용을 입력해주세요!');
				return;
			}

			await handleCreateCategory(request)
				.then(async (response: ISuccess) => {
					if (response.status === 200) {
						successToast('카테고리 생성을 성공하였습니다!');
						await handleCategoryList();
					}
				})

				.catch((error: IError) => {
					const { status, message } = error.response.data;
					errorToast(message);
				});
		}, [handleCreateCategory, categoryName, handleCategoryList]);

		return (
			<CreateCategory
				categoryNameObj={GroupingState(
					'categoryName',
					categoryName,
					setCategoryName
				)}
				handleCloseModal={handleCloseModal}
				requestCreateCategory={requestCreateCategory}
			/>
		);
	}
);

export default CreateCategoryContainer;
