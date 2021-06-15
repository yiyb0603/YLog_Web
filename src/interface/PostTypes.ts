import { IUser } from './AuthTypes';
import { ICategory } from './CategoryTypes';
import ISuccess from './SuccessTypes';

export interface IPostDto {
	idx?: number;
	title: string;
	introduction: string;
	contents: string;
	thumbnail?: string | null;
	categoryIdx: number;
	isTemp: boolean;
}

export interface IPostResponseListTypes extends ISuccess {
	data: {
		posts: IPost[];
	};
}

export interface IPostResponseTypes extends ISuccess {
	data: {
		post: IPost;
	};
}

export interface IPost {
	idx?: number;
	title?: string;
	contents?: string;
	introduction?: string;
	thumbnail?: string | null | undefined;
	category: ICategory;
	user?: IUser;
	likeCount?: number;
	commentLength?: number;
	viewCount?: number;
	isTemp?: boolean;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}
