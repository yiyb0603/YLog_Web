import React, { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import classNames from 'classnames/bind';
import { MdDone } from 'react-icons/md';
import { ClassNamesFn } from 'classnames/types';

const style = require('./CheckBox.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ICheckBoxProps {
	checked: boolean;
	setChecked: Dispatch<SetStateAction<boolean>>;
	children?: ReactNode;
}

const CheckBox = ({ checked, setChecked, children }: ICheckBoxProps) => {
	const handleChecked = useCallback(() => {
		setChecked(!checked);
	}, [checked]);
	return (
		<div className={cx('CheckBox')} onClick={handleChecked}>
			<div
				className={cx('CheckBox-iconWrap', {
					'CheckBox-iconWrap-checked': checked,
				})}
			>
				<MdDone
					size={18}
					className={cx(
						'CheckBox-iconWrap-icon',
						{ 'CheckBox-iconWrap-hiddenIcon': !checked },
						{ 'CheckBox-iconWrap-checked': checked }
					)}
				/>
			</div>
			<span className={cx('CheckBox-contents')}>{children && children}</span>
		</div>
	);
};

CheckBox.defaultProps = {
	checked: false,
	setChecked: () => {},
	children: 'string or Elements',
};

export default CheckBox;
