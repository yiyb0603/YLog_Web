import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import parseTime from 'lib/TimeCounting';
import { NextRouter, useRouter } from 'next/router';
import stringEllipsis from 'lib/util/StringEllipsis';
import { IUser } from 'interface/AuthTypes';

const style = require('./ReleaseItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ReleaseItemProps {
  idx: number;
  title: string;
  user: IUser;
  createdAt: string | Date;
}

const ReleaseItem = ({
  idx,
  title,
  user,
  createdAt,
}: ReleaseItemProps) => {
  const router: NextRouter = useRouter();

  return (
    <div className={cx('ReleaseItem')} onClick={() => router.push(`/release/${idx}`)}>
      <div className={cx('ReleaseItem-Left')}>
        <div className={cx('ReleaseItem-Left-Time')}>{parseTime(createdAt)}</div>
        <div className={cx('ReleaseItem-Left-Idx')}>#{idx}</div>
        <div className={cx('ReleaseItem-Left-Title')}>{stringEllipsis(title, 25)}</div>
      </div>

      <div className={cx('ReleaseItem-Right')}>{user.name}</div>
    </div>
  );
};

export default ReleaseItem;
