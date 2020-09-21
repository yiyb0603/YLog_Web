import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import { IPostListTypes } from 'interface/PostTypes';
import { NextRouter, useRouter } from 'next/router';
import timeCounting from 'time-counting';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import Link from 'next/link';

const style = require('./HomePost.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomePostProps {
	postList: IPostListTypes[];
	categoryList: ICategoryListTypes[];
}

const HomePost = ({ postList, categoryList }: HomePostProps) => {
	const router: NextRouter = useRouter();
	const {
		query: { topic },
	}: NextRouter = router;

	const postLists: false | IPostListTypes[] =
		topic !== undefined
			? postList.filter(
					(post: IPostListTypes) => post.category_idx === Number(topic)
			  )
			: postList;

	return (
		<FadeIn>
			<div className={cx('HomePost')}>
				{postLists.map((post: IPostListTypes) => {
					const {
						idx,
						title,
						introduction,
						category_idx,
						created_at,
						writer,
						thumbnail,
					} = post;

					return (
						<Link href={`/post/${idx}`} key={idx}>
							<div className={cx('HomePost-Item')}>
								<img
									className={cx('HomePost-Item-Thumbnail')}
									src={thumbnail ? thumbnail : '/icon/Logo.PNG'}
									alt="thumbnail"
								/>

								<div className={cx('HomePost-Item-Contents')}>
									<div className={cx('HomePost-Item-Contents-Title')}>
										{title}
									</div>
									<div className={cx('HomePost-Item-Introduction')}>
										{introduction.length > 50
											? introduction.substring(0, 50).concat('...')
											: introduction}
									</div>

									<div className={cx('HomePost-Item-Contents-TimeWrapper')}>
										<div
											className={cx('HomePost-Item-Contents-TimeWrapper-Time')}
										>
											{timeCounting(created_at, { lang: 'ko' })}
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

									<div className={cx('HomePost-Item-Bottom')}>
										<div className={cx('HomePost-Item-Bottom-Option')}>
											<div className={cx('HomePost-Item-Bottom-Option-Modify')}>
												수정
											</div>
											<div className={cx('HomePost-Item-Bottom-Option-Remove')}>
												삭제
											</div>
										</div>

										<div className={cx('HomePost-Item-Bottom-Writer')}>
											{writer}
										</div>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</FadeIn>
	);
};

export default HomePost;
