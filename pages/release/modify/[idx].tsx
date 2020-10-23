import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ReleaseModifyContainer from 'containers/ReleaseContainer/ReleaseModify';
import Router from 'next/router';
import { IAdminPageProps } from '../../admin';
import redirectPage from 'lib/util/RedirectPage';

class ReleaseModifyPage extends Component<IAdminPageProps> {
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
        <ReleaseModifyContainer />
      </PageTemplate>
    );
  }
}

export default ReleaseModifyPage;