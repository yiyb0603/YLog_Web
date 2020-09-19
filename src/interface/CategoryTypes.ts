export interface IPostCategoryTypes {
	idx?: number;
	categoryName?: string;
}

export interface ICategoryResponseTypes {
	status: number;
	message: string;
	data: ICategoryListTypes[];
}

export interface ICategoryListTypes {
	idx: number;
	category_name: string;
}
