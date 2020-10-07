import PageTemplate from 'components/Template/PageTemplate';
import CreateNoticeContainer from 'containers/NoticeContainer/CreateNotice';
import React from 'react';

const NoticeWritePage = () => {
	return (
		<PageTemplate>
			<CreateNoticeContainer />
		</PageTemplate>
	);
};

export default NoticeWritePage;
