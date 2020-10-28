import { INoticeRequestTypes } from "interface/NoticeTypes";
import { errorToast } from "lib/Toast";

const validationNoticeWrite = (request: INoticeRequestTypes) => {
  const { title, contents } = request;

  if (!title!.trim() || !contents!.trim()) {
    errorToast('내용을 모두 입력해주세요!');
    return false;
  }

  return true;
}

export default validationNoticeWrite;