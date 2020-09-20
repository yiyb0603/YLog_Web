import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';

const style = require('./Profile.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ProfileProps {
	handleCloseModal: () => void;
}

const Profile = ({ handleCloseModal }: ProfileProps) => {
	return (
		<div className={cx('Profile')}>
			<Modal title="내 정보" handleCloseModal={handleCloseModal}>
				<div>asdfsdfasdf</div>
			</Modal>
		</div>
	);
};

export default Profile;
