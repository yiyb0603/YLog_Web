import React, { useMemo, SyntheticEvent } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { VscComment } from 'react-icons/vsc';
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai';
import { ClassNamesFn } from 'classnames/types';
import { IToken, IUser } from 'interface/AuthTypes';
import { ICategory } from 'interface/CategoryTypes';
import { NextRouter, useRouter } from 'next/router';
import parseTime from 'lib/TimeCounting';
import stringEllipsis from 'lib/util/StringEllipsis';
import getMyInfo from 'lib/util/getMyInfo';

const style = require('./HomePostItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomePostItemProps {
	idx: number;
	title: string;
	introduction: string;
	categoryIdx: number;
	createdAt: string | Date;
	updatedAt: string | Date;
	thumbnail: string;
	user: IUser;
	commentCount: number;
	viewCount: number;
	likeCount: number;
	categoryList: ICategory[];
	requestDeletePost: (idx: number) => Promise<void>;
}

const HomePostItem = ({
	idx,
	title,
	introduction,
	categoryIdx,
	createdAt,
	updatedAt,
	thumbnail,
	user,
	commentCount,
	viewCount,
	likeCount,
	categoryList,
	requestDeletePost,
}: HomePostItemProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const myInfo: IToken = useMemo(() => getMyInfo(), [getMyInfo]);

	return (
		<div className={cx('HomePost-Item')} key={idx}>
			<Link href={`/post/${idx}`}>
				<div>
					<img
						className={cx('HomePost-Item-Thumbnail')}
						src={thumbnail ? thumbnail : '/assets/images/NO_IMAGES.PNG'}
						alt='thumbnail'
						onError={(e: SyntheticEvent<HTMLImageElement, Event>) =>
							(e.currentTarget.src = '/assets/images/NO_IMAGES.PNG')
						}
					/>

					<div className={cx('HomePost-Item-Contents')}>
						<div className={cx('HomePost-Item-Contents-Title')}>{stringEllipsis(title!, 40)}</div>
						<div className={cx('HomePost-Item-Introduction')}>
							{stringEllipsis(introduction!, 50)}
						</div>

						<div className={cx('HomePost-Item-Contents-TimeWrapper')}>
							<div className={cx('HomePost-Item-Contents-Category')}>
								{
									categoryList.find(
										(category: ICategory) =>
											category.idx === categoryIdx
									)?.categoryName
								}
							</div>

							<div className={cx('HomePost-Item-Contents-TimeWrapper-Time')}>
								{parseTime(createdAt)}
								{updatedAt && '(수정됨)'}
							</div>
						</div>
					</div>
				</div>
			</Link>

			<div className={cx('HomePost-Item-Bottom')}>
				<div className={cx('HomePost-Item-Bottom-Option')}>
					{(myInfo && (myInfo.idx === user.idx || myInfo.isAdmin)) && (
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
					)}
				</div>

				<div className ={cx('HomePost-Item-Bottom-RightWrapper')}>
					<div className ={cx('HomePost-Item-Bottom-RightWrapper-ViewCount')}>
						<AiOutlineEye />
						<div>{viewCount}</div>
					</div>
					<div className={cx('HomePost-Item-Bottom-RightWrapper-LikeCount')}>
						<AiOutlineLike />
						<div>{likeCount}</div>
					</div>
					<div className ={cx('HomePost-Item-Bottom-RightWrapper-commentCount')}>
						<VscComment />
						<div>{commentCount}</div>
					</div>
					<div className={cx('HomePost-Item-Bottom-RightWrapper-Writer')}>
						{user.name}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePostItem;
