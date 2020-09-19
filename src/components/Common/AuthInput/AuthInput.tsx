import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./AuthInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface AuthInputProps {
	type: string;
	placeholder: string;
	value: string | number;
	setValue: Dispatch<SetStateAction<string>>;
}

const AuthInput = ({ type, placeholder, value, setValue }: AuthInputProps) => {
	return (
		<input
			className={cx('AuthInput')}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
		/>
	);
};

export default AuthInput;
