import IUploadTypes from 'interface/UploadTypes';
import store from '../../stores';

// react-markdown-editor-lite 이미지 업로드 로직
const ImageUpload = async (files: File) => {
  const { handleFileUpload } = store.UploadStore;
  let selectFile: string = '';

  const formData: FormData = new FormData();
  formData.append('files', files);
  
  await handleFileUpload(formData)
  .then((response: IUploadTypes) => {
    if (response.status === 200) {
      selectFile = response.data.files[0];
    }
  });

  return selectFile;
};

export default ImageUpload;