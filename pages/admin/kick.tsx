import React, { Component } from 'react';
import AdminTemplate from 'components/Template/AdminTemplate';
import AdminKickContainer from 'containers/AdminContainer/AdminKick';
import redirectPage from 'lib/util/RedirectPage';

class AdminKickPage extends Component {
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
			<AdminTemplate>
				<AdminKickContainer />
			</AdminTemplate>
		)
	}
}

export default AdminKickPage;
