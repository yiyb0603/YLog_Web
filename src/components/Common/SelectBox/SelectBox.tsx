import React, { ReactNode, ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SelectBox.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ISelectBox {
	children?: ReactNode;
	className?: string;
	style?: Object;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({ children, className, style, onChange }: ISelectBox) => {
	return (
		<select
			onChange={onChange}
			className={cx(`select-box ${className}`)}
			style={style}
		>
			{children}
		</select>
	);
};

export default SelectBox;
