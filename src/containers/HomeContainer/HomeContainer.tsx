import React, { useEffect } from 'react';
import Home from 'components/Home';
import { removeCookie } from 'lib/Cookie';
import Constants from 'Constants';
import { IHomeProps } from '../../../pages';
import { NextRouter, useRouter } from 'next/router';
import isAdmin from 'lib/util/isAdmin';

const HomeContainer = ({ postList, noticeList, categoryList }: IHomeProps) => {
	const router: NextRouter = useRouter();
	const { isTemp } = router.query;
	const { ADMIN_TOKEN } = Constants;

	useEffect(() => {
		if (isTemp && (!isAdmin())) {
			router.push('/');
		}
		removeCookie(ADMIN_TOKEN);
	}, [ADMIN_TOKEN]);

	return <Home postList={postList} categoryList={categoryList} noticeList={noticeList} />;
};

export default HomeContainer;
