import getMyInfo from "./getMyInfo";

const isAdmin = () => {
	const { is_admin } = getMyInfo();
	return is_admin;
};

export default isAdmin;
