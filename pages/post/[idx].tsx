import React, { Component } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import PostViewContainer from 'containers/PostContainer/PostViewContainer';
import stores from 'stores';
import { IPostListTypes, IPostResponseTypes } from 'interface/PostTypes';

interface PostViewPageProps {
	post: IPostListTypes;
}

class PostViewPage extends Component<PostViewPageProps> {
	static async getInitialProps(ctx: any) {
		const { handlePostView } = stores.PostStore;

		const response: IPostResponseTypes = await handlePostView(ctx.query.idx);
		const { post } = response.data;

		return {
			post,
		}
	}

	render() {
		const { post } = this.props;

		return (
			<PageTemplate>
				<PostViewContainer post ={post || null} />
			</PageTemplate>
		);
	}
};

export default PostViewPage;
