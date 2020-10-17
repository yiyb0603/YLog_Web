import React, { Component } from 'react';
import isAdmin from 'lib/util/isAdmin';
import Router from 'next/router';
import PageTemplate from 'components/Template/PageTemplate';
import ModifyNoticeContainer from 'containers/NoticeContainer/ModifyNotice';

interface INoticeModifyPageProps {
	admin: boolean;
}

class NoticeModifyPage extends Component<INoticeModifyPageProps> {
	static async getInitialProps() {
		const admin: boolean = isAdmin();

		return {
			admin
		}
	}

	render() {
		const { admin } = this.props;
		if (!admin) {
			Router.back();
			return;
		}

		return (
			<PageTemplate>
				<ModifyNoticeContainer />
			</PageTemplate>
		);
	}
}

export default NoticeModifyPage;
