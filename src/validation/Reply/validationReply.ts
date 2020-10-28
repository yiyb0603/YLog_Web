import { ICommentRequestTypes } from "interface/CommentTypes";
import { errorToast } from "lib/Toast";
import getMyInfo from "lib/util/getMyInfo";

export const validateCreateReply = (request: ICommentRequestTypes) => {
  const { contents, isPrivate } = request;
  const myInfo = getMyInfo();

  if (!contents!.trim()) {
    errorToast('내용을 입력해주세요!');
    return false;
  }

  if (!myInfo && isPrivate) {
    errorToast('비공개 답글은 로그인 후 가능합니다.');
    return false;
  }
  
  return true;
}