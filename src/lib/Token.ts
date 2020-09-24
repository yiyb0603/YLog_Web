export const getToken = () => {
	if (localStorage) {
		return localStorage.getItem('ylog-token');
	}
};
