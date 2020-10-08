import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CategoryContainer from 'containers/CategoryContainer/Category';
import { NextRouter, useRouter } from 'next/router';
import PostContainer from 'containers/PostContainer';
import NoticeContainer from 'containers/NoticeContainer';
import isAdmin from 'lib/isAdmin';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = () => {
	const router: NextRouter = useRouter();

	return (
		<div className={cx('Home')}>
			<div>
				<NoticeContainer />
			</div>
			<div className={cx('Home-Middle')}>
				<div className={cx('Home-Middle-Contents')}>
					<div className={cx('Home-Middle-Contents-Post')}>
						<PostContainer />
					</div>
				</div>

				<div className={cx('Home-Right')}>
					{isAdmin() && (
						<button
							className={cx('Home-Right-WriteButton')}
							onClick={() => router.push('/post/postwrite')}
						>
							글 작성
						</button>
					)}
					<CategoryContainer />
				</div>
			</div>
		</div>
	);
};

export default Home;
