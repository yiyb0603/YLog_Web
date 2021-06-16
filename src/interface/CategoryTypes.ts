import ISuccess from './SuccessTypes';

export interface ICategory {
	idx?: number;
	categoryName?: string;
	postCount?: number;
}

export interface ICategoryResponse extends ISuccess {
	data: ICategory[];
}

export interface ICategorySearchTypes {
	categories?: ICategory[];
	keyword?: string;
}