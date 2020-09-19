import { autobind } from 'core-decorators';
import {
	ICategoryListTypes,
	ICategoryResponseTypes,
	IPostCategoryTypes,
} from 'interface/CategoryTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { action, observable } from 'mobx';

@autobind
export default class CategoryStore {
	@observable categoryList: ICategoryListTypes[] = [];

	@action
	handleCategoryList = async () => {
		try {
			const response: ICategoryResponseTypes = await getResponse('/category');
			this.categoryList = response.data;

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleCreateCategory = async (request: IPostCategoryTypes) => {
		try {
			const response: ISuccessTypes = await postRequest('/category', request);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleModifyCategory = async (request: IPostCategoryTypes) => {
		try {
			const response: ISuccessTypes = await modifyRequest('/category', request);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleDeleteCategory = async (idx: number) => {
		try {
			const response: ISuccessTypes = await deleteRequest(
				`/category?idx=${idx}`
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
