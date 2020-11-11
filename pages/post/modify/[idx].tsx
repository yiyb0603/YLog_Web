import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import redirectPage from 'lib/util/RedirectPage';
import PostFormContainer from 'containers/PostContainer/PostFormContainer';

class ModifyPage extends Component {
	static async getInitialProps(ctx: any) {
		const isValid: boolean = await redirectPage(ctx);

		if (!isValid) {
			ctx.res.writeHead(302, { Location: '/' });
			ctx.res.end();
		}
		
		return {};
	}

	render() {
		return (
			<PageTemplate>
				<PostFormContainer />
			</PageTemplate>
		);
	}
}

export default ModifyPage;
