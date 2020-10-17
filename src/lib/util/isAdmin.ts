import SecureLS from 'secure-ls';

const isAdmin = () => {
	if (typeof window !== 'undefined') {
		const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
		const { is_admin } = ls.get('userInfo');

		return is_admin;
	}
};

export default isAdmin;
