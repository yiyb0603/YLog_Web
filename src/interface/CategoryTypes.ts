import ISuccess from './SuccessTypes';

export interface ICategory {
	idx: number;
	categoryName: string;
}

export interface ICategoryResponse extends ISuccess {
	data: ICategoryList[];
}

export interface ICategorySearchTypes {
	categories?: ICategoryList[];
	keyword?: string;
}

export interface ICategoryList extends ICategory {
	postCount: number;
}
