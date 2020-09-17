import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NavBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NavBar = () => {
	return (
		<div className={cx('NavBar')}>
			<div>dfsfsdf</div>
		</div>
	);
};

export default NavBar;
