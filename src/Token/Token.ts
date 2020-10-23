import { getStorage } from 'lib/Storage';
import * as jwt from 'jsonwebtoken';

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

export const decodeToken = (token: string) => {
	const decoded = jwt.decode(token);
	return decoded;
}