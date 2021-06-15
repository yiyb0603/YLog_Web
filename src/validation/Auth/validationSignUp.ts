import { ISignUpDto } from "interface/AuthTypes";
import { errorToast } from "lib/Toast";
import emailValidation from "validation/util/emailValidation";

const validationSignUp = (request: ISignUpDto, againPassword: string) => {
  const { email, password, name } = request;

  if (!email!.trim() || !password!.trim() || !name!.trim() || !againPassword.trim()) {
    errorToast('값을 모두 입력해주세요!');
    return false;
  }

  if (email!.length < 10) {
    errorToast('10글자 이상으로 이메일을 입력해주세요!');
    return false;
  }

  if (password !== againPassword) {
    errorToast('비밀번호가 일치하지 않습니다.');
    return false;
  }

  if (!emailValidation(email!)) {
    return false;
  }

  return true;
};

export default validationSignUp;