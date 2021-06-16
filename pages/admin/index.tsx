import React, { Component } from 'react';
import redirectPage from 'lib/util/RedirectPage';
import AdminTemplate from 'components/Template/AdminTemplate';
import AllowMemberContainer from 'containers/AdminContainer/AllowMember';

class AdminIndexPage extends Component {
	static async getInitialProps(ctx: any) {
		const isValid = await redirectPage(ctx);

		if (!isValid) {
			ctx.res.writeHead(302, { Location: '/' });
			ctx.res.end();
		}

		return {};
	}

	render() {
		return (
			<AdminTemplate>
				<AllowMemberContainer />
			</AdminTemplate>
		)
	}
}

export default AdminIndexPage;
