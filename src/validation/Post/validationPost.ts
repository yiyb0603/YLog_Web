import { IPostRequestTypes } from "interface/PostTypes";
import { toast } from "react-toastify";

export const validationPostWrite = (request: IPostRequestTypes) => {
  const { title, introduction, contents, categoryIdx, thumbnail } = request;

  if (!title.trim() || !introduction.trim() || !contents.trim()) {
    toast.error('내용을 모두 입력해주세요!');
    return false;
  }

  if (!categoryIdx) {
    toast.error('카테고리를 선택해주세요!');
    return false;
  }

  if (!thumbnail) {
    toast.error('썸네일을 선택해주세요!');
    return false;
  }

  return true;
};