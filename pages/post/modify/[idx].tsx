import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import PostModifyContainer from 'containers/PostContainer/PostModifyContainer';
import redirectPage from 'lib/util/RedirectPage';

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
				<PostModifyContainer />
			</PageTemplate>
		);
	}
}

export default ModifyPage;
