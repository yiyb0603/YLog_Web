import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CategoryContainer from 'containers/CategoryContainer/Category';
import { NextRouter, useRouter } from 'next/router';
import PostContainer from 'containers/PostContainer';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = () => {
	const router: NextRouter = useRouter();

	return (
		<div className={cx('Home')}>
			<div className={cx('Home-Contents')}>
				<div className={cx('Home-Contents-Post')}>
					<PostContainer />
				</div>
			</div>

			<div className={cx('Home-Right')}>
				<button
					className={cx('Home-Right-WriteButton')}
					onClick={() => router.push('/post/postwrite')}
				>
					글 작성
				</button>
				<CategoryContainer />
			</div>
		</div>
	);
};

export default Home;
