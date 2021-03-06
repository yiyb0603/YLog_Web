import ISuccessTypes from './SuccessTypes';

export interface IMemberResponseTypes extends ISuccessTypes {
	data: {
		members: IMemberTypes[];
	};
}

export interface IMemberTypes {
	idx: number;
	name: string;
	email: string;
	is_admin: boolean;
	joined_at?: Date | string;
	profile_image?: string | null;
}
