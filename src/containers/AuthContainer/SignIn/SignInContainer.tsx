import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';

const SignInContainer = observer(({}) => {
	const { AuthStore } = useStores();
	const { handleSignIn } = AuthStore;

	return (
		<>
			<div>hello</div>
		</>
	);
});

export default SignInContainer;
