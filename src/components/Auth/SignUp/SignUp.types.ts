import { Dispatch, SetStateAction } from "react";

export default interface SignUpProps {
	isLoading: boolean;
	setPageType: Dispatch<SetStateAction<string>>;

	nameObject: {
		name: string;
		setName: Dispatch<SetStateAction<string>>;
	};

	emailObject: {
		email: string;
		setEmail: Dispatch<SetStateAction<string>>;
	};

	passwordObject: {
		password: string;
		setPassword: Dispatch<SetStateAction<string>>;
	};

	againPasswordObject: {
		againPassword: string;
		setAgainPassword: Dispatch<SetStateAction<string>>;
	};

	adminCodeObject: {
		adminCode: string;
		setAdminCode: Dispatch<SetStateAction<string>>;
	};

	requestEmailAuth: () => Promise<void>;
}