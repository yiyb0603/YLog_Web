import axios from 'axios';
import Constants from 'Constants';
import { IToken } from 'interface/AuthTypes';
import { decodeToken } from 'Token';
import isAdmin from './isAdmin';

const redirectPage = async (ctx: any) => {
  const isServer: boolean = typeof window === 'undefined';

  if (isServer) {
    if (ctx.req.headers.cookie) {
      // ServerSide Rendering
      const { url } = ctx.req;
      const { USER_TOKEN } = Constants;

      const tokenKey: string = axios.defaults.headers.cookie.split("=")[0];
      const tokenValue: string = axios.defaults.headers.cookie.split("=")[1];

      if (tokenKey === USER_TOKEN && url.indexOf('admin') > -1) {
        return false;
      }

      const userInfo: IToken = await decodeToken(tokenValue) as IToken;
      if (userInfo) {
        return userInfo.isAdmin;
      }
    
      return false;
    } else {
      return true;
    }
    
  } else {
    // Client Side Rendering
    const admin: boolean = isAdmin();
    return admin;
  }
}

export default redirectPage;