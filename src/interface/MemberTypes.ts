import ISuccessTypes from './SuccessTypes';

export interface IMemberResponseTypes extends ISuccessTypes {
	data: {
		members: IMemberTypes[];
	};
}

export interface IMemberTypes {
	id: string;
	name: string;
	email: string;
	is_admin: boolean;
}
