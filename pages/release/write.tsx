import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ReleaseWriteContainer from 'containers/ReleaseContainer/ReleaseWrite';
import redirectPage from 'lib/util/RedirectPage';

class ReleaseWritePage extends Component {
  static async getInitialProps(ctx: any) {
		const isValid: boolean = await redirectPage(ctx);

		if (!isValid) {
			ctx.res.writeHead(302, { Location: '/' });
			ctx.res.end();
		}
		
		return {};
	}

  render() {
    return (
      <PageTemplate>
        <ReleaseWriteContainer />
      </PageTemplate>
    );
  }
}
  

export default ReleaseWritePage;