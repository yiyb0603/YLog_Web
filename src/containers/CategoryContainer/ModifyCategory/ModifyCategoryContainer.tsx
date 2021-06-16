import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import ModifyCategory from 'components/Home/Category/ModifyCategory';
import useStores from 'lib/hooks/useStores';
import { ICategory } from 'interface/CategoryTypes';
import ISuccess from 'interface/SuccessTypes';
import IError from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import { errorToast, successToast } from 'lib/Toast';

interface ModifyCategoryContainerProps {
	handleCloseModal: () => void;
	categoryInfo: ICategory;
}

const ModifyCategoryContainer = observer(
	({ handleCloseModal, categoryInfo }: ModifyCategoryContainerProps): JSX.Element => {
		const { store } = useStores();
		const { handleModifyCategory, handleCategoryList } = store.CategoryStore;

		const { idx }: ICategory = categoryInfo;
		const [categoryName, setCategoryName] = useState<string | undefined>(
			categoryInfo.categoryName
		);

		const requestModifyCategory = useCallback(async () => {
			const request: ICategory = {
				idx,
				categoryName,
			};

			if (!categoryName?.trim()) {
				errorToast('내용을 입력해주세요!');
				return;
			}

			await handleModifyCategory(request)
				.then(async (response: ISuccess) => {
					if (response.status === 200) {
						successToast('카테고리를 수정하였습니다.');
						await handleCategoryList();
					}
				})

				.catch((error: IError) => {
					const { message } = error.response.data;
					errorToast(message);
					return;
				});
		}, [idx, categoryName, handleModifyCategory, handleCategoryList]);

		return (
			<ModifyCategory
				handleCloseModal={handleCloseModal}
				categoryNameObj={GroupingState(
					'categoryName',
					categoryName,
					setCategoryName
				)}
				requestModifyCategory={requestModifyCategory}
			/>
		);
	}
);

export default ModifyCategoryContainer;
