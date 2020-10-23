import React, { Component } from 'react';
import AdminTemplate from 'components/Template/AdminTemplate';
import AllowMemberContainer from 'containers/AdminContainer/AllowMember';
import redirectPage from 'lib/util/RedirectPage';
import Router from 'next/router';

export interface IAdminPageProps {
	isValid: boolean;
}

class AdminIndexPage extends Component<IAdminPageProps> {
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
 				<AllowMemberContainer />
 			</AdminTemplate>
		)
	}
}

export default AdminIndexPage;
