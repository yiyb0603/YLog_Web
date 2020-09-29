import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import NoticeList from 'components/Home/NoticeList';

const NoticeContainer = observer(() => {
	const { store } = useStores();
	const { handleNoticeList, noticeList } = store.NoticeStore;

	useEffect(() => {
		handleNoticeList();
	}, [handleNoticeList]);

	return <NoticeList noticeList={noticeList} />;
});

export default NoticeContainer;
