import React, { Component } from 'react';
import Router from 'next/router';
import isAdmin from 'lib/util/isAdmin';
import PageTemplate from 'components/Template/PageTemplate';
import PostModifyContainer from 'containers/PostContainer/PostModifyContainer';

interface IModifyPageProps {
	admin: boolean;
}

class ModifyPage extends Component<IModifyPageProps> {
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
				<PostModifyContainer />
			</PageTemplate>
		);
	}
}

export default ModifyPage;
