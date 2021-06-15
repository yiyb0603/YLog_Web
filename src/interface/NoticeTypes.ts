import ISuccess from './SuccessTypes';

export interface INotice {
	idx?: number;
	title?: string;
	writer?: string;
	contents?: string;
	createdAt?: Date | string;
	updatedAt?: Date | string;
}

export interface INotceResponseListTypes extends ISuccess {
	data: {
		notices: INotice[];
	};
}

export interface INoticeResponseTypes extends ISuccess {
	data: {
		notice: INotice;
	};
}
