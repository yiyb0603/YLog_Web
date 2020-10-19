import { toast } from "react-toastify";

const emailValidation = (email: string) => {
  const regularEmail: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!regularEmail.test(email)) {
    toast.error('이메일 형식이 올바르지 않습니다.');
    return false;
  }

  return true;
}

export default emailValidation;