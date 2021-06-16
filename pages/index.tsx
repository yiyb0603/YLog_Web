import React, { Component } from 'react';
import HomeContainer from 'containers/HomeContainer';
import PageTemplate from 'components/Template/PageTemplate';
import stores from 'stores';
import { IPost, IPostResponseListTypes } from 'interface/PostTypes';
import { ICategory } from 'interface/CategoryTypes';
import { INotceResponseListTypes, INotice } from 'interface/NoticeTypes';
import dynamic from 'next/dynamic';

// const PageTemplate = dynamic(() => import('components/Template/PageTemplate'));
// const HomeContainer = dynamic(() => import('containers/HomeContainer'));

export interface IHomeProps {
	postList: IPost[];
	categoryList: ICategory[];
	noticeList: INotice[];
}

class IndexPage extends Component<IHomeProps> {
	static async getInitialProps() {
		const { handlePostList } = stores.PostStore;
		const { handleCategoryList } = stores.CategoryStore;
		const { handleNoticeList } = stores.NoticeStore;

		const postResponse: IPostResponseListTypes = await handlePostList();
		const postList: IPost[] = postResponse.data.posts;

		const categoryResponse = await handleCategoryList();
		const categoryList: ICategory[] = categoryResponse.data;

		const noticeResponse: INotceResponseListTypes = await handleNoticeList();
		const noticeList: INotice[] = noticeResponse.data.notices;

		return {
			postList,
			noticeList,
			categoryList,
		};
	};

	render() {
		const { postList, categoryList, noticeList } = this.props;

		return (
			<PageTemplate>
				<HomeContainer
					postList={postList}
					categoryList={categoryList}
					noticeList={noticeList}
				/>
			</PageTemplate>
		);
	}
};

export default IndexPage;
