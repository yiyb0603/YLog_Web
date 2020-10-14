import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ReleaseContainer from 'containers/ReleaseContainer';
import WriteButton from 'components/Common/Button/WriteButton';
import { HiPencil } from 'react-icons/hi';

const style = require('./ReleaseTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ReleaseTemplate = () => {
  return (
    <div className ={cx('ReleaseTemplate')}>
      <div className ={cx('ReleaseTemplate-TopWrapper')}>
        <div className ={cx('ReleaseTemplate-TopWrapper-Top')}>
          <div className ={cx('ReleaseTemplate-TopWrapper-Top-Title')}>YLog 릴리즈 노트</div>
          <WriteButton
            width ="180px"
            nextFunction ={() => {}}
          >
            <HiPencil />
            <div>릴리즈 작성</div>
          </WriteButton>
        </div>

        <div className ={cx('ReleaseTemplate-TopWrapper-Subtitle')}>릴리즈 노트는 관리자만 작성 가능합니다.</div>
      </div>
      <ReleaseContainer />
    </div>
  )
};

export default ReleaseTemplate;