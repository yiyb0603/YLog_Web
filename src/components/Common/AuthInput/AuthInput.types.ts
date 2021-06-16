import { Dispatch, SetStateAction, KeyboardEvent } from 'react';

export default interface AuthInputProps {
	type: string;
	placeholder: string;
	value: string | number;
	setValue: Dispatch<SetStateAction<string>>;
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}