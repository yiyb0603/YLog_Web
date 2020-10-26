import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';
import { IMemberTypes } from 'interface/MemberTypes';
import { handleMomentParse } from 'lib/Moment';

const style = require('./Profile.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ProfileProps {
	selectImage: string;
	profileImage: string;
	handleCloseModal: () => void;
	userInfo: IMemberTypes;
	requestImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Profile = ({ selectImage, profileImage, userInfo, handleCloseModal, requestImageUpload }: ProfileProps) => {
	const { email, name, joined_at } = userInfo;
	return (
		<div className={cx('Profile')}>
			<Modal
				width="500px"
				height="500px"
				title="내 정보"
				handleCloseModal={handleCloseModal}
			>
				<div className={cx('Profile-Contents')}>
					<div className={cx('Profile-Contents-Top')}>
						<img src ={!selectImage ? (profileImage ? profileImage : '/assets/icon/profile_default.jpg') : selectImage}
							className={cx('Profile-Contents-Top-Image')} />
						<input type ="file" id ="selectImage" onChange ={requestImageUpload} accept="image/*" />
						<label className ={cx('Profile-Contents-Top-Label')} htmlFor ="selectImage">이미지 변경</label>
					</div>

					<div className ={cx('Profile-Contents-Bottom')}>
						<div>이름: {name}</div>
						<div>이메일: {email}</div>
						<div>가입일: {handleMomentParse(joined_at!, 'YYYY년 MM월 DD일')}</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Profile;
