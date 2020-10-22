import React, { Component } from 'react';
import Router from 'next/router';
import isAdmin from 'lib/util/isAdmin';
import PageTemplate from 'components/Template/PageTemplate';
import PostWriteContainer from 'containers/PostContainer/PostWriteContainer';

interface IPostWritePageProps {
	admin: boolean;
}

class PostWritePage extends Component<IPostWritePageProps> {
	static async getInitialProps() {
		const admin: boolean = isAdmin();

		return {
			admin
		}
	}

	render() {
		const { admin } = this.props;
		// if (!admin) {
		// 	Router.back();
		// 	return;
		// }

		return (
			<PageTemplate>
				<PostWriteContainer />
			</PageTemplate>
		);
	}
}

export default PostWritePage;
