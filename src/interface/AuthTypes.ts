import ISuccessTypes from './SuccessTypes';

export interface ISignInResponseTypes extends ISuccessTypes {
	data: {
		ylogToken: string;
		userInfo: IUserInfoTypes;
	};
}

export interface IUserInfoTypes {
	id: string;
	name: string;
	password: string;
	email: string;
	joined_at: string;
	proflile_image: string;
	is_admin: boolean | string | null;
}

export interface ISignUpTypes {
	id: string;
	password: string;
	name: string;
	email: string;
	adminCode?: string | false | null;
}

export interface ISignInTypes {
	id: string;
	password: string;
}
