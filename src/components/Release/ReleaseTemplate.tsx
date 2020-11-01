import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ReleaseContainer from 'containers/ReleaseContainer';
import WriteButton from 'components/Common/Button/WriteButton';
import { HiPencil } from 'react-icons/hi';
import isAdmin from 'lib/util/isAdmin';
import { NextRouter, useRouter } from 'next/router';

const style = require('./ReleaseTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ReleaseTemplate = () => {
  const router: NextRouter = useRouter();

  return (
    <div className ={cx('ReleaseTemplate')}>
      <div className ={cx('ReleaseTemplate-TopWrapper')}>
        <div className ={cx('ReleaseTemplate-TopWrapper-Top')}>
          <div className ={cx('ReleaseTemplate-TopWrapper-Top-Title')}>YLog 릴리즈 노트</div>
          
          {
            isAdmin() &&
            <WriteButton
              width ="180px"
              nextFunction ={() => router.push(`/release/write`)}
            >
              <HiPencil />
              <div>릴리즈 작성</div>
            </WriteButton>
          }
        </div>

        <div className ={cx('ReleaseTemplate-TopWrapper-Subtitle')}>릴리즈 노트는 관리자만 작성 가능합니다.</div>
      </div>
      <ReleaseContainer />
    </div>
  )
};

export default ReleaseTemplate;