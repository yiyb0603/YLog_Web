import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import { IPostListTypes } from 'interface/PostTypes';
import { ICategoryListTypes } from 'interface/CategoryTypes';
import HomePostItem from './HomePostItem';
import NoPosts from '../NoPosts';

const style = require('./HomePost.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface HomePostProps {
	filterPost: IPostListTypes[];
	categoryList: ICategoryListTypes[];
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
				{filterPost.length > 0 ? (
					filterPost.map((post: IPostListTypes) => {
						const {
							idx,
							title,
							introduction,
							category_idx,
							created_at,
							writer,
							thumbnail,
							updated_at,
							comment_length,
							view_count,
							like_count,
						} = post;

						return (
							<HomePostItem
								key={idx!}
								idx={idx!}
								title={title!}
								introduction={introduction!}
								category_idx={category_idx!}
								created_at={created_at!}
								updated_at={updated_at!}
								writer={writer!}
								thumbnail={thumbnail!}
								viewCount ={view_count!}
								likeCount={like_count!}
								commentLength ={comment_length!}
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
