import React, { Component } from 'react';
import AdminTemplate from 'components/Template/AdminTemplate';
import AllowMemberContainer from 'containers/AdminContainer/AllowMember';
import { getAdminToken } from 'Token/Token';
import Router from 'next/router';

interface IAdminPageProps {
	token: string;
}

class AdminIndexPage extends Component<IAdminPageProps> {
	static async getInitialProps() {
		const token: string | null | undefined = getAdminToken();

		return {
			token,
		}
	};

	render() {
		const { token } = this.props;

		if (!token) {
			Router.back();
			return;
		}

		return (
			<AdminTemplate>
 				<AllowMemberContainer />
 			</AdminTemplate>
		)
	}
}

export default AdminIndexPage;
