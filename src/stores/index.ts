import AuthStore from './AuthStore';
import CategoryStore from './CategoryStore';
import CommentStore from './CommentStore';
import MemberStore from './MemberStore';
import NoticeStore from './NoticeStore';
import PostStore from './PostStore';
import ReleaseStore from './ReleaseStore';
import ReplyStore from './ReplyStore';
import ProfileStore from './ProfileStore';
import UploadStore from './UploadStore';
import LikeStore from './LikeStore';

const stores = {
	AuthStore: new AuthStore(),
	CategoryStore: new CategoryStore(),
	PostStore: new PostStore(),
	CommentStore: new CommentStore(),
	ReplyStore: new ReplyStore(),
	UploadStore: new UploadStore(),
	NoticeStore: new NoticeStore(),
	MemberStore: new MemberStore(),
	ProfileStore: new ProfileStore(),
	ReleaseStore: new ReleaseStore(),
	LikeStore: new LikeStore(),
};

export default stores;
