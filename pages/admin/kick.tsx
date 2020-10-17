import React, { Component } from 'react';
import AdminTemplate from 'components/Template/AdminTemplate';
import AdminKickContainer from 'containers/AdminContainer/AdminKick';
import { getAdminToken } from 'Token/Token';
import Router from 'next/router';

interface IAdminKickPageProps {
	token: string;
}

class AdminKickPage extends Component<IAdminKickPageProps> {
	static async getInitialProps() {
		const token: string | null | undefined = getAdminToken();

		return {
			token
		}
	}

	render() {
		const { token } = this.props;
		if (!token) {
			Router.back();
			return;
		}

		return (
			<AdminTemplate>
				<AdminKickContainer />
			</AdminTemplate>
		)
	}
}

export default AdminKickPage;
