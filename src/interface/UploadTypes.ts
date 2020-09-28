import ISuccessTypes from './SuccessTypes';

export default interface IUploadTypes extends ISuccessTypes {
	data: {
		files: string[];
	};
}
