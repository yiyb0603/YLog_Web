import SecureLS from "secure-ls";
import { decodeToken } from "Token/Token";
import axios from 'axios';

const getMyInfo = () => {
  const isServer: boolean = typeof window === 'undefined';
  if (isServer) {
    if (axios.defaults.headers.Cookie) {
      return decodeToken(axios.defaults.headers.Cookie);
    }
  } else {
    const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
    return ls.get('userInfo');
  }
};

export default getMyInfo;