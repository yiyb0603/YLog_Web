import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import ModifyCategory from 'components/Home/Category/ModifyCategory';
import useStores from 'lib/hooks/useStores';
import { IPostCategoryTypes } from 'interface/CategoryTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import IErrorTypes from 'interface/ErrorTypes';
import GroupingState from 'lib/util/GroupingState';
import { toast } from 'react-toastify';

interface ModifyCategoryContainerProps {
	handleCloseModal: () => void;
	categoryInfo: IPostCategoryTypes;
}

const ModifyCategoryContainer = observer(
	({ handleCloseModal, categoryInfo }: ModifyCategoryContainerProps) => {
		const { store } = useStores();
		const { handleModifyCategory, handleCategoryList } = store.CategoryStore;

		const { idx }: IPostCategoryTypes = categoryInfo;
		const [categoryName, setCategoryName] = useState<string | undefined>(
			categoryInfo.categoryName
		);

		const requestModifyCategory = useCallback(async () => {
			const request: IPostCategoryTypes = {
				idx,
				categoryName,
			};

			if (!categoryName?.trim()) {
				toast.error('내용을 입력해주세요!');
				return;
			}

			await handleModifyCategory(request)
				.then(async (response: ISuccessTypes) => {
					if (response.status === 200) {
						toast.success('카테고리를 수정하였습니다.');
						await handleCategoryList();
					}
				})

				.catch((error: IErrorTypes) => {
					const { message } = error.response.data;
					toast.error(message);
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
