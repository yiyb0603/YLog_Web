import { action } from 'mobx';
import { autobind } from 'core-decorators';
import { postRequest } from 'lib/Axios';

@autobind
export default class UploadStore {
	@action
	handleFileUpload = async (files: File | FormData) => {
		try {
			const response = await postRequest('/upload', files);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
