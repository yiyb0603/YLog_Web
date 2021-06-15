import { IRelease } from "interface/ReleaseTypes";
import { errorToast } from "lib/Toast";

export const validationReleaseWrite = (request: IRelease) => {
  const { title, contents } = request;

  if (!title!.trim() || !contents!.trim()) {
    errorToast('내용을 모두 입력해주세요!');
    return false;
  }

  return true;
}