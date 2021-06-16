import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';

const style = require('./Modal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ModalProps {
	width?: string;
	height?: string;
	title: string;
	handleCloseModal: () => void;
	children?: ReactNode;
}

const Modal = ({
	width,
	height,
	title,
	handleCloseModal,
	children,
}: ModalProps): JSX.Element => {
	return (
		<>
			<div className={cx('Modal-Wrapper')} onClick={handleCloseModal}></div>
			<div className={cx('Modal')} style={{ width, height }}>
				<div className={cx('Modal-Top')}>
					<div className={cx('Modal-Top-Contents')}>
						<div className={cx('Modal-Top-Contents-Title')}>{title}</div>
						<MdClose
							className={cx('Modal-Top-Contents-Icon')}
							onClick={handleCloseModal}
						/>
					</div>
				</div>

				{children && children}
			</div>
		</>
	);
};

export default Modal;
