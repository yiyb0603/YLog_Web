import AuthStore from './AuthStore';
import CategoryStore from './CategoryStore';
import PostStore from './PostStore';

const stores = {
	AuthStore: new AuthStore(),
	CategoryStore: new CategoryStore(),
	PostStore: new PostStore(),
};

export default stores;
