import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/hooks/useStores';
import NoticeList from 'components/Home/NoticeList';
import { INotice } from 'interface/NoticeTypes';

interface INoticeContainerProps {
	notices: INotice[];
}

const NoticeContainer = observer(({ notices }: INoticeContainerProps): JSX.Element => {
	const { store } = useStores();
	const { handleNoticeList, noticeList } = store.NoticeStore;

	const [count, setCount] = useState<number>(1);

	const handleIncreaseCount = useCallback(() => {
		if (noticeList.length === count) {
			setCount(1);
		} else {
			setCount(count + 1);
		}
	}, [noticeList, count, setCount]);

	const handleDecreaseCount = useCallback(() => {
		if (count - 1 === 0) {
			setCount(noticeList.length);
		} else {
			setCount(count - 1);
		}
	}, [noticeList, count, setCount]);

	useEffect(() => {
		handleNoticeList();
	}, [handleNoticeList]);

	return (
		<NoticeList
			noticeList={notices || noticeList}
			count={count}
			handleIncreaseCount={handleIncreaseCount}
			handleDecreaseCount={handleDecreaseCount}
		/>
	);
});

export default NoticeContainer;
