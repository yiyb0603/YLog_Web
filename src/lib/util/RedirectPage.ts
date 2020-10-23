import { decodeToken } from 'Token/Token';
import isAdmin from './isAdmin';

const redirectPage = (ctx: any) => {
  const isServer: boolean = typeof window === 'undefined';

  if (isServer && ctx.req.headers.cookie) {
    // ServerSide Rendering
    const { is_admin }: any = decodeToken(ctx.req.headers.cookie.split("=")[1]);

    return is_admin;
  } else {
    // Client Side Rendering
    const admin: boolean = isAdmin();
    return admin;
  }
}

export default redirectPage;