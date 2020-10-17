import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ReleaseModifyContainer from 'containers/ReleaseContainer/ReleaseModify';
import isAdmin from 'lib/util/isAdmin';
import Router from 'next/router';

interface IReleaseModifyPageProps {
	admin: boolean;
}

class ReleaseModifyPage extends Component<IReleaseModifyPageProps> {
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
        <ReleaseModifyContainer />
      </PageTemplate>
    );
  }
}

export default ReleaseModifyPage;