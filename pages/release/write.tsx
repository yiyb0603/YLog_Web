import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ReleaseWriteContainer from 'containers/ReleaseContainer/ReleaseWrite';
import Router from 'next/router';
import redirectPage from 'lib/util/RedirectPage';
import { IAdminPageProps } from '../admin';

class ReleaseWritePage extends Component<IAdminPageProps> {
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
        <ReleaseWriteContainer />
      </PageTemplate>
    );
  }
}
  

export default ReleaseWritePage;