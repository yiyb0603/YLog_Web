import { ISignUpTypes } from "interface/AuthTypes";
import { toast } from "react-toastify";
import emailValidation from "validation/util/emailValidation";

const validationSignUp = (request: ISignUpTypes) => {
  const { email, password, name } = request;

  if (!email!.trim() || !password!.trim() || !name!.trim()) {
    toast.error('값을 모두 입력해주세요!');
    return false;
  }

  if (email!.length < 10) {
    toast.error('10글자 이상으로 이메일을 입력해주세요!');
    return false;
  }

  if (!emailValidation(email!)) {
    return false;
  }

  return true;
};

export default validationSignUp;