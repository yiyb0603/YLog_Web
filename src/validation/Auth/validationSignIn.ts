import { ISignInTypes } from "interface/AuthTypes";
import { toast } from "react-toastify";
import emailValidation from "validation/util/emailValidation";

const validationSignIn = (request: ISignInTypes) => {
  const { email, password } = request;

  if (!email.trim() || !password.trim()) {
    toast.error('값을 모두 입력해주세요!');
    return false;
  }

  if (!emailValidation(email!)) {
    return false;
  }

  return true;
};

export default validationSignIn;