import { IReleaseTypes } from "interface/ReleaseTypes";
import { toast } from "react-toastify";

export const validationReleaseWrite = (request: IReleaseTypes) => {
  const { title, contents } = request;

  if (!title!.trim() || !contents!.trim()) {
    toast.error('내용을 모두 입력해주세요!');
    return false;
  }

  return true;
}