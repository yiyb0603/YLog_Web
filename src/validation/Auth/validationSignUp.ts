import { ISignUpTypes } from "interface/AuthTypes";
import { errorToast } from "lib/Toast";
import emailValidation from "validation/util/emailValidation";

const validationSignUp = (request: ISignUpTypes) => {
  const { email, password, name } = request;

  if (!email!.trim() || !password!.trim() || !name!.trim()) {
    errorToast('값을 모두 입력해주세요!');
    return false;
  }

  if (email!.length < 10) {
    errorToast('10글자 이상으로 이메일을 입력해주세요!');
    return false;
  }

  if (!emailValidation(email!)) {
    return false;
  }

  return true;
};

export default validationSignUp;