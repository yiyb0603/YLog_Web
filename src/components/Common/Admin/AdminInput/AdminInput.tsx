import React, {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	KeyboardEvent,
} from 'react';
import { Input } from '@class101/ui';
import classNames from 'classnames';
import { useKeyDown } from 'lib/hooks/useKeyDown';
import { ClassNamesFn } from 'classnames/types';
import AdminInputProps from './AdminInput.types';

const style = require('./AdminInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

const AdminInput = ({
	label,
	type,
	value,
	setValue,
	requestFunction,
}: AdminInputProps) => {
	return (
		<Input
			className={cx('AdminInput')}
			type={type}
			size="md"
			value={value}
			label={label}
			onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
			onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => useKeyDown(e, requestFunction)}
		/>
	);
};

export default AdminInput;
