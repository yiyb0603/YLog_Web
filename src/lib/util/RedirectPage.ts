import Router from 'next/router';
import isAdmin from "./isAdmin"

const redirectPage = () => {
  const admin: boolean = isAdmin();

  if (!admin) {
    Router.push('/');
  }
};

export default redirectPage;