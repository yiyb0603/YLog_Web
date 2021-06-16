import React, { memo, ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import AuthInputProps from './AuthInput.types';

const style = require('./AuthInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

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
			autoComplete='off'
			onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
			onKeyDown={onKeyDown}
		/>
	);
};

export default memo(AuthInput);
