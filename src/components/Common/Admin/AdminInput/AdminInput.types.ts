import { Dispatch, SetStateAction } from "react";

export default interface AdminInputProps {
	label: string;
	type: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	requestFunction: () => Promise<void>;
}