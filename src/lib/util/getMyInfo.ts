import SecureLS from 'secure-ls';
import { decodeToken } from 'Token';
import axios from 'axios';

const getMyInfo = () => {
  const isServer: boolean = typeof window === 'undefined';
  if (isServer) {
    if (axios.defaults.headers.cookie) {
      return decodeToken(axios.defaults.headers.cookie.split('=')[1]);
    }
  } else {
    const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
    return ls.get('userInfo');
  }
};

export default getMyInfo;