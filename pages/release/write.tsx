import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ReleaseWriteContainer from 'containers/ReleaseContainer/ReleaseWrite';
import isAdmin from 'lib/util/isAdmin';
import Router from 'next/router';

interface IPostWritePageProps {
	admin: boolean;
}

class ReleaseWritePage extends Component<IPostWritePageProps> {
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
        <ReleaseWriteContainer />
      </PageTemplate>
    );
  }
}
  

export default ReleaseWritePage;