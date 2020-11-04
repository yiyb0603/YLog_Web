import { Dispatch, SetStateAction } from "react";

export default interface AdminLoginProps {
	emailObject: {
		email: string;
		setEmail: Dispatch<SetStateAction<string>>;
	};

	passwordObject: {
		password: string;
		setPassword: Dispatch<SetStateAction<string>>;
	};

	requestAdminLogin: () => Promise<void>;
}