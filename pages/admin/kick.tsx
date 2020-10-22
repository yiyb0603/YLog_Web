import React, { Component } from 'react';
import AdminTemplate from 'components/Template/AdminTemplate';
import AdminKickContainer from 'containers/AdminContainer/AdminKick';

class AdminKickPage extends Component {
	render() {
		return (
			<AdminTemplate>
				<AdminKickContainer />
			</AdminTemplate>
		)
	}
}

export default AdminKickPage;
