import ISuccess from './SuccessTypes';

export interface ISignInResponse extends ISuccess {
	data: {
		ylogToken: string;
		userInfo: IUser;
	};
}

export interface IToken {
	idx: number;
	name: string;
	email: string;
	profileImage: string;
	isAdmin: boolean;
}

export interface IUser extends IToken {
	password: string;
	joinedAt: string;
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
