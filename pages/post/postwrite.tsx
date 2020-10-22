import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import PostWriteContainer from 'containers/PostContainer/PostWriteContainer';

class PostWritePage extends Component {
	render() {
		return (
			<PageTemplate>
				<PostWriteContainer />
			</PageTemplate>
		);
	}
}

export default PostWritePage;
