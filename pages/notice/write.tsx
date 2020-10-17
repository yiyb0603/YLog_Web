import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import CreateNoticeContainer from 'containers/NoticeContainer/CreateNotice';
import isAdmin from 'lib/util/isAdmin';
import Router from 'next/router';

interface INoticeWritePageProps {
	admin: boolean;
}

class NoticeWritePage extends Component<INoticeWritePageProps> {
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
				<CreateNoticeContainer />
			</PageTemplate>
		);
	}
}

export default NoticeWritePage;
