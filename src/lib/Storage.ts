export const setStorage = (key: string, data: any) => {
	localStorage.setItem(key, data);
};

export const getStorage = (key: string) => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(key);
	}
};

export const removeStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const clearStorage = () => {
	localStorage.clear();
};
