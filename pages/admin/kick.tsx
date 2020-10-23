import React, { Component } from 'react';
import AdminTemplate from 'components/Template/AdminTemplate';
import AdminKickContainer from 'containers/AdminContainer/AdminKick';
import { IAdminPageProps } from '.';
import redirectPage from 'lib/util/RedirectPage';
import Router from 'next/router';

class AdminKickPage extends Component<IAdminPageProps> {
	static async getInitialProps(ctx: any) {
		const isValid: boolean = await redirectPage(ctx);
		
		return {
			isValid
		};
	}

	render() {
		const { isValid } = this.props;
		if (!isValid) {
			Router.push('/');
			return <></>;
		}
		
		return (
			<AdminTemplate>
				<AdminKickContainer />
			</AdminTemplate>
		)
	}
}

export default AdminKickPage;
