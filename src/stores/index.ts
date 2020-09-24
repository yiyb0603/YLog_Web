import AuthStore from './AuthStore';
import CategoryStore from './CategoryStore';
import CommentStore from './CommentStore';
import PostStore from './PostStore';
import ReplyStore from './ReplyStore';

const stores = {
	AuthStore: new AuthStore(),
	CategoryStore: new CategoryStore(),
	PostStore: new PostStore(),
	CommentStore: new CommentStore(),
	ReplyStore: new ReplyStore(),
};

export default stores;
