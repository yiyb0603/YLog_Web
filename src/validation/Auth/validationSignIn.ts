import { ISignInDto } from "interface/AuthTypes";
import { errorToast } from "lib/Toast";
import emailValidation from "validation/util/emailValidation";

const validationSignIn = (request: ISignInDto) => {
  const { email, password } = request;

  if (!email.trim() || !password.trim()) {
    errorToast('값을 모두 입력해주세요!');
    return false;
  }

  if (!emailValidation(email!)) {
    return false;
  }

  return true;
};

export default validationSignIn;