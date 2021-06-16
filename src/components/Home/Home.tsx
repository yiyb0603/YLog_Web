import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { HiPencil } from 'react-icons/hi';
import { AiOutlineGithub } from 'react-icons/ai';
import Constants from 'Constants';
import { NextRouter, useRouter } from 'next/router';
import isAdmin from 'lib/util/isAdmin';
import CategoryContainer from 'containers/CategoryContainer/Category';
import PostContainer from 'containers/PostContainer';
import NoticeContainer from 'containers/NoticeContainer';
import WriteButton from 'components/Common/Button/WriteButton';
import { IHomeProps } from '../../../pages';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = ({
	postList,
	noticeList,
	categoryList,
}: IHomeProps) => {
	const router: NextRouter = useRouter();
	const { GITHUB_ADDRESS } = Constants;

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
						<button
							className={cx('Home-Right-Github')}
							onClick={() => window.open(GITHUB_ADDRESS)}
						>
							<AiOutlineGithub style={{ fontSize: 25 }} />
							<div>Github</div>
						</button>

						{
							isAdmin() &&
							<WriteButton
								nextFunction={() => router.push('/post/postwrite')}
							>
								<HiPencil />
								<div>글 작성</div>
							</WriteButton>
						}
						<CategoryContainer categories={categoryList} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
