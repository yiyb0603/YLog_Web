import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import PostFormContainer from 'containers/PostContainer/PostFormContainer';
import redirectPage from 'lib/util/RedirectPage';

class PostWritePage extends Component {
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

export default PostWritePage;
