import React, { ReactNode, ChangeEvent, CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SelectBox.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ISelectBox {
	children?: ReactNode;
	style?: CSSProperties;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({
	children,
	style,
	onChange,
}: ISelectBox) => {
	return (
		<select
			className={cx('SelectBox')}
			onChange={onChange}
			style={style}
		>
			{children}
		</select>
	);
};

export default SelectBox;
