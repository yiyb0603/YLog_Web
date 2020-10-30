import React, { Component } from 'react';
import HomeContainer from 'containers/HomeContainer';
import PageTemplate from 'components/Template/PageTemplate';
import stores from 'stores';
import { IPostListTypes, IPostResponseListTypes } from 'interface/PostTypes';
import { ICategoryListTypes, ICategoryResponseTypes } from 'interface/CategoryTypes';
import { INotceResponseListTypes, INoticeRequestTypes } from 'interface/NoticeTypes';
import dynamic from 'next/dynamic';

// const PageTemplate = dynamic(() => import('components/Template/PageTemplate'));
// const HomeContainer = dynamic(() => import('containers/HomeContainer'));

export interface IHomeProps {
	postList: IPostListTypes[];
	categoryList: ICategoryListTypes[];
	noticeList: INoticeRequestTypes[];
}

class IndexPage extends Component<IHomeProps> {
	static async getInitialProps() {
		const { handlePostList } = stores.PostStore;
		const { handleCategoryList } = stores.CategoryStore;
		const { handleNoticeList } = stores.NoticeStore;

		const postResponse: IPostResponseListTypes = await handlePostList();
		const postList: IPostListTypes[] = postResponse.data.posts;

		const categoryResponse: ICategoryResponseTypes = await handleCategoryList();
		const categoryList: ICategoryListTypes[] = categoryResponse.data;

		const noticeResponse: INotceResponseListTypes = await handleNoticeList();
		const noticeList: INoticeRequestTypes[] = noticeResponse.data.notices;

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
				<HomeContainer postList={postList} categoryList={categoryList} noticeList={noticeList} />
			</PageTemplate>
		);
	}
};

export default IndexPage;
