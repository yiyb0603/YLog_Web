import { getStorage } from 'lib/Storage';

export const getUserToken = () => {
	const userToken: string | null | undefined = getStorage('ylog-token');
	return userToken;
};

export const getAdminToken = () => {
	const adminToken: string | null | undefined = getStorage('ylog-adminToken');
	return adminToken;
};
