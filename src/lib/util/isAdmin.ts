import getMyInfo from "./getMyInfo";

const isAdmin = () => {
	const myInfo = getMyInfo();

	if (!myInfo) {
		return false;
	}

	return myInfo.is_admin;
};

export default isAdmin;
