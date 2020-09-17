import SignTemplate from 'components/Auth/SignTemplate';
import React from 'react';
// import SignInContainer from 'containers/AuthContainer/SignIn';
import { Provider } from 'mobx-react';
import stores from 'stores';
import 'styles/Default.scss';

const IndexPage = () => {
	return (
		<Provider {...stores}>
			<SignTemplate />
			{/* <SignInContainer /> */}
		</Provider>
	);
};

export default IndexPage;
