import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { INotice } from 'interface/NoticeTypes';
import parseTime from 'lib/TimeCounting';
import { NextRouter, useRouter } from 'next/router';
import getMyInfo from 'lib/util/getMyInfo';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const MarkdownRender = dynamic(() => import('components/Common/Markdown/MarkdownRender'));

const style = require('./NoticeView.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeViewProps {
	noticeInfo: INotice;
	requestDeleteNotice: (idx: number) => Promise<void>;
}

const NoticeView = ({
	noticeInfo,
	requestDeleteNotice,
}: NoticeViewProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const { idx, writer, title, contents, createdAt, updatedAt } = useMemo(() => noticeInfo, [noticeInfo]);
	const myInfo = useMemo(() => getMyInfo(), [getMyInfo]);

	return (
		<div className={cx('NoticeView')}>
			<div className={cx('NoticeView-Contents')}>
				<div className={cx('NoticeView-Contents-Title')}>{title}</div>
				<div className={cx('NoticeView-Contents-Info')}>
					<div className={cx('NoticeView-Contents-Info-Option')}>
						{
							(myInfo && myInfo.isAdmin) &&
							<>
								<div
									className={cx('NoticeView-Contents-Info-Option-Modify')}
									onClick={() => router.push(`/notice/modify/${idx}`)}
								>
									수정
								</div>
								<div
									className={cx('NoticeView-Contents-Info-Option-Delete')}
									onClick={() => requestDeleteNotice(idx!)}
								>
									삭제
								</div>
							</>
						}
					</div>

					<div className={cx('NoticeView-Contents-Info-Personal')}>
						<div>
							{parseTime(createdAt!)}
							{updatedAt && ' (수정됨)'}
						</div>
						<div className={cx('NoticeView-Contents-Info-Personal-Writer')}>
							{writer}
						</div>
					</div>
				</div>

				<div className={cx('NoticeView-Contents-Contents')}>
					<MarkdownRender contents={contents!} />
				</div>
			</div>
		</div>
	);
};

export default NoticeView;
