import React, { ChangeEvent, SyntheticEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';
import { IMemberTypes } from 'interface/MemberTypes';
import { handleMomentParse } from 'lib/Moment';

const style = require('./Profile.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ProfileProps {
	handleCloseModal: () => void;
	userInfo: IMemberTypes;
	requestDefaultImage: () => Promise<void>;
	requestImageUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Profile = ({ userInfo, handleCloseModal, requestDefaultImage, requestImageUpload }: ProfileProps) => {
	const { email, name, joined_at, profile_image } = userInfo;
	return (
		<div className={cx('Profile')}>
			<Modal
				width="500px"
				height="520px"
				title="내 정보"
				handleCloseModal={handleCloseModal}
			>
				<div className={cx('Profile-Contents')}>
					<div className={cx('Profile-Contents-Top')}>
						<img src ={profile_image ? profile_image : '/assets/icon/profile_default.jpg'}
							className={cx('Profile-Contents-Top-Image')}
							onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
								(e.currentTarget.src = '/assets/icon/profile_default.jpg')
							}
						/>
						
						<div className ={cx('Profile-Contents-Top-LabelWrapper')}>
							<input type ="file" id ="selectImage" onChange ={requestImageUpload} accept="image/*" />
							<button className ={cx('Profile-Contents-Top-LabelWrapper-Default')} onClick={requestDefaultImage}>기본 이미지</button>
							<label className ={cx('Profile-Contents-Top-LabelWrapper-Change')} htmlFor ="selectImage">이미지 변경</label>
						</div>
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
