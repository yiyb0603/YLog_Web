import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CategoryContainer from 'containers/CategoryContainer/Category';
import { NextRouter, useRouter } from 'next/router';
import PostContainer from 'containers/PostContainer';
import NoticeContainer from 'containers/NoticeContainer';
import isAdmin from 'lib/util/isAdmin';
import WriteButton from 'components/Common/Button/WriteButton';
import { HiPencil } from 'react-icons/hi';
import { IHomeProps } from '../../../pages';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = ({ postList, noticeList, categoryList }: IHomeProps) => {
	const router: NextRouter = useRouter();

	return (
		<div className={cx('Home')}>
			<div>
				<NoticeContainer notices={noticeList} />
			</div>
			<div className={cx('Home-Middle')}>
				<div className={cx('Home-Middle-Contents')}>
					<div className={cx('Home-Middle-Contents-Post')}>
						<PostContainer posts={postList} />
					</div>
				</div>

				<div className={cx('Home-Right')}>
					<div>
						{isAdmin() && (
							<WriteButton
								nextFunction ={() => router.push('/post/postwrite')}
							>
								<HiPencil />
								<div>글 작성</div>
							</WriteButton>
						)}
						<CategoryContainer categories={categoryList} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
