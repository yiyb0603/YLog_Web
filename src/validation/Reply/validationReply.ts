import { ICommentRequestTypes } from "interface/CommentTypes";
import { toast } from "react-toastify";

export const validateCreateReply = (request: ICommentRequestTypes) => {
  const { contents } = request;

  if (!contents!.trim()) {
    toast.error('내용을 입력해주세요!');
    return false;
  }

  return true;
}