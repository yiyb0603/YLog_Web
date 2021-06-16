import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import Profile from 'components/Home/Profile';
import getMyInfo from 'lib/util/getMyInfo';
import IUploadTypes from 'interface/UploadTypes';
import { IProfileModifyDto } from 'interface/ProfileTypes';
import ISuccess from 'interface/SuccessTypes';
import { errorToast, successToast } from 'lib/Toast';
import IError from 'interface/ErrorTypes';
import { useMemo } from 'react';

interface IProfileContainerProps {
  handleCloseModal: () => void;
}

const ProfileContainer = observer(({
  handleCloseModal,
}: IProfileContainerProps) => {
  const { store } = useStores();
  const { handleModifyProfile, handleGetProfile, userInfo } = store.ProfileStore;
  const { handleFileUpload } = store.UploadStore;

  const myInfo = useMemo(() => getMyInfo(), [getMyInfo]);

  const [selectImage, setSelectImage] = useState<string>('');

  const requestImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const formData: FormData = new FormData();
    const { files } = e.target;
    formData.append('files', files![0]);

    await handleFileUpload(formData)
    .then(async (response: IUploadTypes) => {
      setSelectImage(response.data.files[0]);
    })

    .catch((error: IError) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [handleFileUpload]);

  const requestChangeProfile = useCallback(async () => {
    const request: IProfileModifyDto = {
      userIdx: myInfo.idx,
      profileImage: selectImage ? selectImage : null,
    }

    await handleModifyProfile(request)
    .then(({ status }: ISuccess) => {
      if (status === 200) {
        successToast('프로필 사진을 변경하였습니다.');
        handleGetProfile(myInfo.idx);
      }
    })

    .catch((error: IError) => {
      const { message } = error.response.data;
      errorToast(message);
      return;
    })
  }, [myInfo, selectImage, handleModifyProfile, handleGetProfile]);

  useEffect(() => {
    if (selectImage) {
      requestChangeProfile();
    }
  }, [requestChangeProfile, selectImage]);

  useEffect(() => {
    if (Number.isInteger(myInfo.idx)) {
      handleGetProfile(myInfo.idx);
    }
  }, [handleGetProfile, myInfo]);

  return (
    <Profile
      userInfo={userInfo}
      handleCloseModal={handleCloseModal}
      requestChangeProfile={requestChangeProfile}
      requestImageUpload={requestImageUpload}
    />
  );
});

export default ProfileContainer;