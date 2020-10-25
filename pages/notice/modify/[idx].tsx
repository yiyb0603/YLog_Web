import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ModifyNoticeContainer from 'containers/NoticeContainer/ModifyNotice';
import redirectPage from 'lib/util/RedirectPage';

class NoticeModifyPage extends Component {
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
				<ModifyNoticeContainer />
			</PageTemplate>
		);
	}
}

export default NoticeModifyPage;
