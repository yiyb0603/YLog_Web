import AuthStore from './AuthStore';
import CategoryStore from './CategoryStore';
import CommentStore from './CommentStore';
import MemberStore from './MemberStore';
import NoticeStore from './NoticeStore';
import PostStore from './PostStore';
import ReplyStore from './ReplyStore';
import UploadStore from './UploadStore';

const stores = {
	AuthStore: new AuthStore(),
	CategoryStore: new CategoryStore(),
	PostStore: new PostStore(),
	CommentStore: new CommentStore(),
	ReplyStore: new ReplyStore(),
	UploadStore: new UploadStore(),
	NoticeStore: new NoticeStore(),
	MemberStore: new MemberStore(),
};

export default stores;
