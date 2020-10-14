import React from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import { IReleaseTypes } from "interface/ReleaseTypes";
import parseTime from "lib/TimeCounting";
import MarkdownRender from "components/Common/Markdown/MarkdownRender";

const style = require("./ReleasePage.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface ReleasePageProps {
  releaseInfo: IReleaseTypes;
}

const ReleasePage = ({ releaseInfo, requestReleaseDelete }: ReleasePageProps) => {
  const { idx, title, contents, writer, created_at, updated_at } = releaseInfo;

  return (
    <div className={cx('ReleasePage')}>
			<div className={cx('ReleasePage-Contents')}>
				<div className={cx('ReleasePage-Contents-Title')}>{title}</div>
				<div className={cx('ReleasePage-Contents-Info')}>
					<div className={cx('ReleasePage-Contents-Info-Personal')}>
            <div className={cx('ReleasePage-Contents-Info-Personal-Wrapper')}>
              <div className={cx('ReleasePage-Contents-Info-Personal-Time')}>
                {parseTime(created_at!)}
                {updated_at && ' (수정됨)'}
              </div>
              <div className={cx('ReleasePage-Contents-Info-Personal-Writer')}>
                {writer}
              </div>
            </div>

            <div className={cx('ReleasePage-Contents-Info-Personal-Option')}>
              <div className={cx('ReleasePage-Contents-Info-Personal-Option-Modify')}>수정</div>
              <div className={cx('ReleasePage-Contents-Info-Personal-Option-Delete')} onClick ={() => requestReleaseDelete(idx)}>삭제</div>
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
