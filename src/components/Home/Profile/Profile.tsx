import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';
import SecureLS from 'secure-ls';
import { handleMomentParse } from 'lib/Moment';

const style = require('./Profile.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ProfileProps {
	handleCloseModal: () => void;
}

const Profile = ({ handleCloseModal }: ProfileProps) => {
	const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
	const { email, name, joined_at } = ls.get('userInfo');

	return (
		<div className={cx('Profile')}>
			<Modal
				width="300px"
				height="300px"
				title="내 정보"
				handleCloseModal={handleCloseModal}
			>
				<div className={cx('Profile-Contents')}>
					<img src="/assets/images/NO_IMAGES.PNG" alt="profile" />

					<div className={cx('Profile-Contents-List')}>
						<div>이름: {name}</div>
						<div>이메일: {email}</div>
						<div>
							가입일: {handleMomentParse(joined_at, 'YYYY년 MM월 DD일')}
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Profile;
