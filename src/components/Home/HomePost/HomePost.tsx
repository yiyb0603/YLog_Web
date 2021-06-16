import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import { IPost } from 'interface/PostTypes';
import { ICategory } from 'interface/CategoryTypes';
import HomePostItem from './HomePostItem';
import NoPosts from '../NoPosts';

const style = require('./HomePost.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface HomePostProps {
	filterPost: IPost[];
	categoryList: ICategory[];
	requestDeletePost: (idx: number) => Promise<void>;
}

const HomePost = ({
	filterPost,
	categoryList,
	requestDeletePost,
}: HomePostProps) => {
	return (
		<FadeIn>
			<div className={cx('HomePost')}>
				{filterPost && filterPost.length > 0 ? (
					filterPost.map((post: IPost) => {
						const {
							idx,
							title,
							introduction,
							category,
							user,
							thumbnail,
							createdAt,
							updatedAt,
							commentCount,
							viewCount,
							likeCount,
						} = post;

						return (
							<HomePostItem
								key={idx!}
								idx={idx!}
								title={title!}
								introduction={introduction!}
								categoryIdx={category?.idx!}
								createdAt={createdAt!}
								updatedAt={updatedAt!}
								user={user!}
								thumbnail={thumbnail!}
								viewCount ={viewCount!}
								likeCount={likeCount!}
								commentCount ={commentCount!}
								categoryList={categoryList}
								requestDeletePost={requestDeletePost}
							/>
						);
					})
				) : (
					<NoPosts />
				)}
			</div>
		</FadeIn>
	);
};

export default HomePost;
