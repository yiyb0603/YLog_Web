import getMyInfo from './getMyInfo';

const isAdmin = (): boolean => {
	const myInfo = getMyInfo();

	if (!(myInfo || myInfo.isAdmin)) {
		return false;
	}

	return true;
};

export default isAdmin;
