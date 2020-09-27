import React, {
	KeyboardEvent,
	ChangeEvent,
	Dispatch,
	SetStateAction,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { onKeyDown } from 'lib/onKeyDown';

const style = require('./AuthInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AuthInputProps {
	type: string;
	placeholder: string;
	value: string | number;
	setValue: Dispatch<SetStateAction<string>>;
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const AuthInput = ({
	type,
	placeholder,
	value,
	setValue,
	onKeyDown,
}: AuthInputProps) => {
	return (
		<input
			className={cx('AuthInput')}
			type={type}
			placeholder={placeholder}
			value={value}
			autoComplete="off"
			onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
			onKeyDown={onKeyDown}
		/>
	);
};

export default AuthInput;
