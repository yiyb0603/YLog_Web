import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import timeCounting from 'time-counting';
import { ClassNamesFn } from 'classnames/types';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import SecureLS from 'secure-ls';
import { IUserInfoTypes } from 'interface/AuthTypes';

const style = require('./HomePostItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomePostItemProps {
	idx: number;
	title: string;
	introduction: string;
	category_idx: number;
	created_at: string | Date;
	thumbnail: string;
	writer: string;
	categoryList: ICategoryListTypes[];
	requestDeletePost: (idx: number) => Promise<void>;
}

const HomePostItem = ({
	idx,
	title,
	introduction,
	category_idx,
	created_at,
	thumbnail,
	writer,
	categoryList,
	requestDeletePost,
}: HomePostItemProps) => {
	const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
	const myInfo: IUserInfoTypes = ls.get('userInfo');

	return (
		<div className={cx('HomePost-Item')} key={idx}>
			<Link href={`/post/${idx}`}>
				<div>
					<img
						className={cx('HomePost-Item-Thumbnail')}
						src={thumbnail ? thumbnail : '/icon/Logo.PNG'}
						alt="thumbnail"
					/>

					<div className={cx('HomePost-Item-Contents')}>
						<div className={cx('HomePost-Item-Contents-Title')}>{title}</div>
						<div className={cx('HomePost-Item-Introduction')}>
							{introduction!.length > 50
								? introduction!.substring(0, 50).concat('...')
								: introduction}
						</div>

						<div className={cx('HomePost-Item-Contents-TimeWrapper')}>
							<div className={cx('HomePost-Item-Contents-TimeWrapper-Time')}>
								{timeCounting(created_at!, { lang: 'ko' })}
							</div>

							<div className={cx('HomePost-Item-Contents-Category')}>
								{
									categoryList.find(
										(category: ICategoryListTypes) =>
											category.idx === category_idx
									)?.category_name
								}
							</div>
						</div>
					</div>
				</div>
			</Link>

			<div className={cx('HomePost-Item-Bottom')}>
				<div className={cx('HomePost-Item-Bottom-Option')}>
					{myInfo.name === writer || myInfo.is_admin ? (
						<>
							<div className={cx('HomePost-Item-Bottom-Option-Modify')}>
								수정
							</div>
							<div
								className={cx('HomePost-Item-Bottom-Option-Remove')}
								onClick={() => requestDeletePost(idx!)}
							>
								삭제
							</div>
						</>
					) : (
						<></>
					)}
				</div>

				<div className={cx('HomePost-Item-Bottom-Writer')}>{writer}</div>
			</div>
		</div>
	);
};

export default HomePostItem;
