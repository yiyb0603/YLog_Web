import { IPostRequestTypes } from "interface/PostTypes";
import { errorToast } from "lib/Toast";

export const validationPostWrite = (request: IPostRequestTypes) => {
  const { title, introduction, contents, categoryIdx, thumbnail } = request;

  if (!title.trim() || !introduction.trim() || !contents.trim()) {
    errorToast('내용을 모두 입력해주세요!');
    return false;
  }

  if (!categoryIdx) {
    errorToast('카테고리를 선택해주세요!');
    return false;
  }

  if (!thumbnail) {
    errorToast('썸네일을 선택해주세요!');
    return false;
  }

  return true;
};