import { getStorage } from 'lib/Storage';

export const getUserToken = () => {
	// 유저 페이지 토큰
	const userToken: string | null | undefined = getStorage('ylog-token');
	return userToken;
};

export const getAdminToken = () => {
	// 어드민 페이지 토큰
	const adminToken: string | null | undefined = getStorage('ylog-adminToken');
	return adminToken;
};
