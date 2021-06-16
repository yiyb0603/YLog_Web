import React, { Component } from 'react';
import stores from 'stores';
import { IPost, IPostResponse } from 'interface/PostTypes';
import PostViewContainer from 'containers/PostContainer/PostViewContainer';
import PageTemplate from 'components/Template/PageTemplate';
import ScrollProgress from 'components/Common/ScrollProgress';

interface PostViewPageProps {
	post: IPost;
}

class PostViewPage extends Component<PostViewPageProps> {
	static async getInitialProps(ctx: any) {
		const { handlePostView } = stores.PostStore;

		const response: IPostResponse = await handlePostView(ctx.query.idx);
		const { post } = response.data;

		return {
			post,
		}
	}

	render() {
		const { post } = this.props;

		return (
			<PageTemplate>
				<ScrollProgress />
				<PostViewContainer post ={post} />
			</PageTemplate>
		);
	}
};

export default PostViewPage;
