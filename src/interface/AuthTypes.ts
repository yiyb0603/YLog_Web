import ISuccess from './SuccessTypes';

export interface ISignInResponseTypes extends ISuccess {
	data: {
		ylogToken: string;
		userInfo: IUser;
	};
}

export interface IUser {
	idx: number;
	name: string;
	password: string;
	email: string;
	joinedAt: string;
	profileImage: string;
	isAdmin: boolean | string | null;
	isAllow: boolean;
}

export interface ISignUpDto {
	password?: string;
	name?: string;
	email?: string;
	adminCode?: string | false | null;
}

export interface ISignInDto {
	email: string;
	password: string;
}

export interface IEmailCodeDto {
	email: string;
	code: string;
}
