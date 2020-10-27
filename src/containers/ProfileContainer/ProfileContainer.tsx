import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import Profile from 'components/Home/Profile';
import getMyInfo from 'lib/util/getMyInfo';
import IUploadTypes from 'interface/UploadTypes';
import { IProfileModifyTypes } from 'interface/ProfileTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { toast } from 'react-toastify';

interface IProfileContainerProps {
  handleCloseModal: () => void;
}

const ProfileContainer = observer(({ handleCloseModal }: IProfileContainerProps) => {
  const { store } = useStores();
  const { handleModifyProfile, handleGetProfile, userInfo } = store.ProfileStore;
  const { handleFileUpload } = store.UploadStore;

  const { idx } = getMyInfo();
  const userIdx: number = Number(idx);

  const [selectImage, setSelectImage] = useState<string>('');

  const requestImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const formData: FormData = new FormData();
    const { files } = e.target;
    formData.append('files', files![0]);

    await handleFileUpload(formData)
    .then(async (response: IUploadTypes) => {
      setSelectImage(response.data.files[0]);
    })
  }, [handleFileUpload]);

  const requestDefaultImage = useCallback(async () => {
    const request: IProfileModifyTypes = {
      userIdx,
      profileImage: null,
    };

    await handleModifyProfile(request)
    .then(({ status }: ISuccessTypes) => {
      if (status === 200) {
        toast.success('프로필 사진을 변경하였습니다.');
        handleGetProfile(userIdx);
      }
    })
  }, [handleModifyProfile, handleGetProfile, userIdx]);

  const requestChangeProfile = useCallback(async () => {
    const request: IProfileModifyTypes = {
      userIdx,
      profileImage: selectImage,
    }

    await handleModifyProfile(request)
    .then(({ status }: ISuccessTypes) => {
      if (status === 200) {
        toast.success('프로필 사진을 변경하였습니다.');
        handleGetProfile(userIdx);
      }
    });
  }, [userIdx, selectImage, handleModifyProfile, handleGetProfile]);

  useEffect(() => {
    if (selectImage) {
      requestChangeProfile();
    }
  }, [requestChangeProfile, selectImage]);

  useEffect(() => {
    if (Number.isInteger(userIdx)) {
      handleGetProfile(userIdx);
    }
  }, [handleGetProfile, userIdx]);

  return (
    <Profile
      userInfo ={userInfo}
      handleCloseModal ={handleCloseModal}
      requestDefaultImage ={requestDefaultImage}
      requestImageUpload={requestImageUpload}
    />
  )
});

export default ProfileContainer;