export const getToken = () => {
	if (sessionStorage) {
		return sessionStorage.getItem('ylog-token');
	}
};
