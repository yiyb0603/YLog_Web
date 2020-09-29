import ISuccessTypes from './SuccessTypes';

export interface INoticeRequestTypes {
	idx?: number;
	title?: string;
	writer?: string;
	contents?: string;
}

export interface INotceResponseListTypes extends ISuccessTypes {
	data: {
		notices: INoticeRequestTypes[];
	};
}

export interface INoticeResponseTypes extends ISuccessTypes {
	data: {
		notice: INoticeRequestTypes;
	};
}
