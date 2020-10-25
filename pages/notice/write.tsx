import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import CreateNoticeContainer from 'containers/NoticeContainer/CreateNotice';
import redirectPage from 'lib/util/RedirectPage';

class NoticeWritePage extends Component {
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
				<CreateNoticeContainer />
			</PageTemplate>
		);
	}
}

export default NoticeWritePage;
