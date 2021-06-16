export default interface IError {
	response: {
		data: {
			status: number;
			message: string;
		};
	};
}
