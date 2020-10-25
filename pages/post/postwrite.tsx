import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import PostWriteContainer from 'containers/PostContainer/PostWriteContainer';
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
				<PostWriteContainer />
			</PageTemplate>
		);
	}
}

export default PostWritePage;
