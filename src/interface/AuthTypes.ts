export interface ISignInResponseTypes {
	status: number;
	message: string;
	data: {
		ylogToken: string;
		userInfo: {
			id: string;
			name: string;
			password: string;
			email: string;
			joined_at: string;
			profile_image: string;
			is_admin: null;
		};
	};
}

export interface ISignUpTypes {
	id: string;
	password: string;
	name: string;
	email: string;
	joinedAt: Date | string;
	adminCode?: string | false | null;
}

export interface ISignInTypes {
	id: string;
	password: string;
}
