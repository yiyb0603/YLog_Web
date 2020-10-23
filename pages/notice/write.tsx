import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import CreateNoticeContainer from 'containers/NoticeContainer/CreateNotice';
import Router from 'next/router';
import { IAdminPageProps } from '../admin';
import redirectPage from 'lib/util/RedirectPage';

class NoticeWritePage extends Component<IAdminPageProps> {
	static async getInitialProps(ctx: any) {
		const isValid: boolean = await redirectPage(ctx);
		
		return {
			isValid
		};
	}

	render() {
		const { isValid } = this.props;
		if (!isValid) {
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
