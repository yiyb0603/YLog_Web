import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./FormButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface FormButtonProps {
	buttonValue: string | JSX.Element;
	requestFunction?: () => Promise<void>;
}

const FormButton = ({
	buttonValue,
	requestFunction,
}: FormButtonProps) => {
	return (
		<button
			className={cx('FormButton')}
			onClick={requestFunction}
		>
			{buttonValue}
		</button>
	);
};

export default FormButton;
