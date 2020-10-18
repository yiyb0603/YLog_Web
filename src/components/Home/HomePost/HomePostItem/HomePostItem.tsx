import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { MdComment } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { ClassNamesFn } from 'classnames/types';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import SecureLS from 'secure-ls';
import { IUserInfoTypes } from 'interface/AuthTypes';
import { NextRouter, useRouter } from 'next/router';
import parseTime from 'lib/TimeCounting';
import stringEllipsis from 'lib/util/StringEllipsis';

const style = require('./HomePostItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomePostItemProps {
	idx: number;
	title: string;
	introduction: string;
	category_idx: number;
	created_at: string | Date;
	updated_at: string | Date;
	thumbnail: string;
	writer: string;
	commentLength: number;
	viewCount: number;
	categoryList: ICategoryListTypes[];
	requestDeletePost: (idx: number) => Promise<void>;
}

const HomePostItem = ({
	idx,
	title,
	introduction,
	category_idx,
	created_at,
	updated_at,
	thumbnail,
	writer,
	commentLength,
	viewCount,
	categoryList,
	requestDeletePost,
}: HomePostItemProps) => {
	const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
	const myInfo: IUserInfoTypes = ls.get('userInfo');
	const router: NextRouter = useRouter();

	return (
		<div className={cx('HomePost-Item')} key={idx}>
			<Link href={`/post/${idx}`}>
				<div>
					<img
						className={cx('HomePost-Item-Thumbnail')}
						src={thumbnail ? thumbnail : '/assets/images/NO_IMAGES.PNG'}
						alt="thumbnail"
						onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
							(e.currentTarget.src = '/assets/images/NO_IMAGES.PNG')
						}
					/>

					<div className={cx('HomePost-Item-Contents')}>
						<div className={cx('HomePost-Item-Contents-Title')}>{title}</div>
						<div className={cx('HomePost-Item-Introduction')}>
							{stringEllipsis(introduction!, 50)}
						</div>

						<div className={cx('HomePost-Item-Contents-TimeWrapper')}>
							<div className={cx('HomePost-Item-Contents-TimeWrapper-Time')}>
								{parseTime(created_at)}
								{updated_at && '(수정됨)'}
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
							<div
								className={cx('HomePost-Item-Bottom-Option-Modify')}
								onClick={() => router.push(`/post/modify/${idx}`)}
							>
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

				<div className ={cx('HomePost-Item-Bottom-RightWrapper')}>
					<div className ={cx('HomePost-Item-Bottom-RightWrapper-ViewCount')}>
						<AiOutlineEye />
						<div>{viewCount}</div>
					</div>
					<div className ={cx('HomePost-Item-Bottom-RightWrapper-CommentLength')}>
						<MdComment />
						<div>{commentLength}</div>
					</div>
					<div className={cx('HomePost-Item-Bottom-RightWrapper-Writer')}>{writer}</div>
				</div>
			</div>
		</div>
	);
};

export default HomePostItem;
