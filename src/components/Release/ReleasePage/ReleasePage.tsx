import React, { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IRelease } from 'interface/ReleaseTypes';
import parseTime from 'lib/TimeCounting';
import { NextRouter, useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import isAdmin from 'lib/util/isAdmin';

const MarkdownRender = dynamic(() => import('components/Common/Markdown/MarkdownRender'));

const style = require('./ReleasePage.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReleasePageProps {
  releaseInfo: IRelease;
  requestReleaseDelete: (idx: number) => Promise<void>;
}

const ReleasePage = ({
  releaseInfo,
  requestReleaseDelete,
}: ReleasePageProps) => {
  const router: NextRouter = useRouter();
  const {
    idx,
    title,
    contents,
    user,
    createdAt,
    updatedAt,
  } = useMemo(() => releaseInfo, [releaseInfo]);

  return (
    <div className={cx('ReleasePage')}>
			<div className={cx('ReleasePage-Contents')}>
				<div className={cx('ReleasePage-Contents-Title')}>{title}</div>
				<div className={cx('ReleasePage-Contents-Info')}>
					<div className={cx('ReleasePage-Contents-Info-Personal')}>
            <div className={cx('ReleasePage-Contents-Info-Personal-Option')}>
              {
                isAdmin() &&
                <>
                  <div
                    className={cx('ReleasePage-Contents-Info-Personal-Option-Modify')}
                    onClick={() => router.push(`/release/modify/${idx}`)}
                  >
                    수정
                  </div>
                  <div
                    className={cx('ReleasePage-Contents-Info-Personal-Option-Delete')}
                    onClick={() => requestReleaseDelete(idx!)}
                  >
                    삭제
                  </div>
                </>
              }
            </div>

            <div className={cx('ReleasePage-Contents-Info-Personal-Wrapper')}>
              <div className={cx('ReleasePage-Contents-Info-Personal-Time')}>
                {parseTime(createdAt!)}
                {updatedAt && ' (수정됨)'}
              </div>
              <div className={cx('ReleasePage-Contents-Info-Personal-Writer')}>
                {user!.name}
              </div>
            </div>
					</div>
				</div>

				<div className={cx('ReleasePage-Contents-Contents')}>
					<MarkdownRender contents={contents!} />
				</div>
			</div>
		</div>
  );
};

export default ReleasePage;
