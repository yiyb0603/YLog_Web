import ISuccess from './SuccessTypes';

export default interface IUploadTypes extends ISuccess {
	data: {
		files: string[];
	};
}
