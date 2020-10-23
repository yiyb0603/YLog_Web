import React, { Component } from 'react';
import Router from 'next/router';
import PageTemplate from 'components/Template/PageTemplate';
import ModifyNoticeContainer from 'containers/NoticeContainer/ModifyNotice';
import { IAdminPageProps } from '../../admin';
import redirectPage from 'lib/util/RedirectPage';

class NoticeModifyPage extends Component<IAdminPageProps> {
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
				<ModifyNoticeContainer />
			</PageTemplate>
		);
	}
}

export default NoticeModifyPage;
