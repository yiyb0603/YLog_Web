import ISuccessTypes from './SuccessTypes';

export interface ISignInResponseTypes extends ISuccessTypes {
	data: {
		ylogToken: string;
		userInfo: IUserInfoTypes;
	};
}

export interface IUserInfoTypes {
	idx: number;
	name: string;
	password: string;
	email: string;
	joined_at: string;
	proflile_image: string;
	is_admin: boolean | string | null;
	is_allow: boolean;
}

export interface ISignUpTypes {
	password?: string;
	name?: string;
	email?: string;
	adminCode?: string | false | null;
}

export interface ISignInTypes {
	email: string;
	password: string;
}

export interface IEmailCodeTypes {
	email: string;
	code: string;
}
