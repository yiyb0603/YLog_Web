import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ReleaseModifyContainer from 'containers/ReleaseContainer/ReleaseModify';
import redirectPage from 'lib/util/RedirectPage';

class ReleaseModifyPage extends Component {
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
        <ReleaseModifyContainer />
      </PageTemplate>
    );
  }
}

export default ReleaseModifyPage;