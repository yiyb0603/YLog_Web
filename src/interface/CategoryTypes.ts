import ISuccessTypes from './SuccessTypes';

export interface IPostCategoryTypes {
	idx?: number;
	categoryName?: string;
}

export interface ICategoryResponseTypes extends ISuccessTypes {
	data: ICategoryListTypes[];
}

export interface ICategorySearchTypes {
	categories?: ICategoryListTypes[];
	keyword?: string;
}

export interface ICategoryListTypes {
	idx: number;
	category_name: string;
	post_count: number;
}
