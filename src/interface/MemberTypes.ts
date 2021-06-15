import { IUser } from './AuthTypes';
import ISuccess from './SuccessTypes';

export interface IMemberResponse extends ISuccess {
	data: {
		members: IUser[];
	};
}