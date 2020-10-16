import React, { Dispatch, SetStateAction } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from "classnames/types";
import { IPostCategoryTypes } from "interface/CategoryTypes";
import { NextRouter, useRouter } from "next/router";
import SecureLS from "secure-ls";
import { BsPen, BsTrash } from "react-icons/bs";
import stringEllipsis from "lib/util/StringEllipsis";

const style = require("./RowCategoryItem.scss");
const cx: ClassNamesFn = classNames.bind(style);

interface RowCategoryItemProps {
  idx: number;
	categoryName: string;
	postCount: number;
	setCategoryInfo: Dispatch<SetStateAction<IPostCategoryTypes>>;
	setIsModify: Dispatch<SetStateAction<boolean>>;
	requestDeleteCategory: (idx: number) => void;
}

const RowCategoryItem = ({ idx, categoryName, postCount, setCategoryInfo, setIsModify, requestDeleteCategory }: RowCategoryItemProps) => {
  const router: NextRouter = useRouter();
	const { topic, keyword } = router.query;

	const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
	const { is_admin } = ls.get('userInfo');
  
  return (
    <div className ={cx('RowCategoryItem', {
      'RowCategoryItem-Current': idx === Number(topic)
    })}>
      <div
        onClick={() =>
					router.push(
						keyword ? `/?topic=${idx}&keyword=${keyword}` : `/?topic=${idx}`
					)
				}>
        {stringEllipsis(categoryName, 14)}
      </div>
      <div className ={cx('RowCategoryItem-Count')}>({postCount})</div>
      {
        is_admin &&
        <>
          <div className={cx('RowCategoryItem-Icon')}>
            <BsPen
              className={cx('RowCategoryItem-Icon-Modify')}
              onClick={() => {
                setCategoryInfo({ idx, categoryName });
                setIsModify(true);
              }}
            />

            <BsTrash
              className={cx('RowCategoryItem-Icon-Delete')}
              onClick={() => requestDeleteCategory(idx)}
            />
				  </div>
        </>
      }
    </div>
  );
};

export default RowCategoryItem;
