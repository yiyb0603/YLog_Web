import * as jwt from 'jsonwebtoken';
import Constants from 'Constants';
import { getCookie } from 'lib/Cookie';

const { USER_TOKEN, ADMIN_TOKEN } = Constants;

export const getUserToken = () => {
	// 유저 페이지 토큰
	const userToken: string | null | undefined = getCookie(USER_TOKEN);
	return userToken;
};

export const getAdminToken = () => {
	// 어드민 페이지 토큰
	const adminToken: string | null | undefined = getCookie(ADMIN_TOKEN);
	return adminToken;
};

export const decodeToken = (token: string) => {
	// 디코딩 토큰
	const decoded = jwt.decode(token);
	return decoded;
}