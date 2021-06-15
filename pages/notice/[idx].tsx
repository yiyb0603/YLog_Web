import PageTemplate from 'components/Template/PageTemplate';
import NoticeViewContainer from 'containers/NoticeContainer/NoticeView';
import { INotice, INoticeResponseTypes } from 'interface/NoticeTypes';
import React, { Component } from 'react';
import stores from 'stores';

interface INoticeViewPageProps {
	notice: INotice;
}

class NoticeViewPage extends Component<INoticeViewPageProps> {
	static async getInitialProps(ctx: any) {
		const { handleNoticeView } = stores.NoticeStore;

		const response: INoticeResponseTypes = await handleNoticeView(ctx.query.idx);
		const { notice } = response.data;

		return {
			notice,
		}
	}

	render() {
		const { notice } = this.props;

		return (
			<PageTemplate>
				<NoticeViewContainer notice ={notice} />
			</PageTemplate>
		);
	}
};

export default NoticeViewPage;
