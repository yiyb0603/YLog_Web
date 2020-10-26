import { decodeToken } from 'Token/Token';
import isAdmin from './isAdmin';
import axios from 'axios';

const redirectPage = async (ctx: any) => {
  const isServer: boolean = typeof window === 'undefined';

  if (isServer) {
    if (ctx.req.headers.cookie) {
      // ServerSide Rendering

      const userInfo: any = await decodeToken(axios.defaults.headers.cookie.split("=")[1]);
      if (userInfo) {
        return userInfo.is_admin;
      }
    
      return false;
    }
    
  } else {
    // Client Side Rendering
    const admin: boolean = isAdmin();
    return admin;
  }
}

export default redirectPage;