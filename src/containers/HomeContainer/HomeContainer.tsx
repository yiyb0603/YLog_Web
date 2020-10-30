import React, { useEffect } from 'react';
import Home from 'components/Home';
import { removeCookie } from 'lib/Cookie';
import Constants from 'Constants';
import { IHomeProps } from '../../../pages';

const HomeContainer = ({ postList, noticeList, categoryList }: IHomeProps) => {
	const { ADMIN_TOKEN } = Constants;

	useEffect(() => {
		removeCookie(ADMIN_TOKEN);
	}, [ADMIN_TOKEN]);

	return <Home postList={postList} categoryList={categoryList} noticeList={noticeList} />;
};

export default HomeContainer;
