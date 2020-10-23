import React, { Component } from 'react';
import Router from 'next/router';
import PageTemplate from 'components/Template/PageTemplate';
import PostModifyContainer from 'containers/PostContainer/PostModifyContainer';
import { IAdminPageProps } from '../../admin';
import redirectPage from 'lib/util/RedirectPage';

class ModifyPage extends Component<IAdminPageProps> {
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
			<PageTemplate>
				<PostModifyContainer />
			</PageTemplate>
		);
	}
}

export default ModifyPage;
