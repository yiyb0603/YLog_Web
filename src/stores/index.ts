import AuthStore from './AuthStore';
import CategoryStore from './CategoryStore';

const stores = {
	AuthStore: new AuthStore(),
	CategoryStore: new CategoryStore(),
};

export default stores;
