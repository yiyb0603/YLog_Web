import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import HomePost from './HomePost';
import CategoryContainer from 'containers/CategoryContainer/Category';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomeProps {}

const Home = ({}: HomeProps) => {
	return (
		<div className={cx('Home')}>
			<div className={cx('Home-Contents')}>
				<div className={cx('Home-Contents-Post')}>
					<HomePost />
				</div>

				<div className={cx('Home-Contents-Category')}>
					<CategoryContainer />
				</div>
			</div>
		</div>
	);
};

export default Home;
