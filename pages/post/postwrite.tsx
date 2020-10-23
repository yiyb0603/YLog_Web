import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import PostWriteContainer from 'containers/PostContainer/PostWriteContainer';
import { IAdminPageProps } from '../admin';
import redirectPage from 'lib/util/RedirectPage';
import Router from 'next/router';

class PostWritePage extends Component<IAdminPageProps> {
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
				<PostWriteContainer />
			</PageTemplate>
		);
	}
}

export default PostWritePage;
