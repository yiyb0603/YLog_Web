import React, { useEffect } from 'react';
import Home from 'components/Home';
import { removeCookie } from 'lib/Cookie';
import Constants from 'Constants';

const HomeContainer = () => {
	const { ADMIN_TOKEN } = Constants;

	useEffect(() => {
		removeCookie(ADMIN_TOKEN);
	}, [ADMIN_TOKEN]);

	return <Home />;
};

export default HomeContainer;
