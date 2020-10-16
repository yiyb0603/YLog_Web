import { autobind } from 'core-decorators';
import {
	IPostListTypes,
	IPostRequestTypes,
	IPostResponseListTypes,
	IPostResponseTypes,
} from 'interface/PostTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import {
	deleteRequest,
	getResponse,
	modifyRequest,
	postRequest,
} from 'lib/Axios';
import { getUserToken } from 'Token/Token';
import { observable, action } from 'mobx';
import CommentStore from 'stores/CommentStore';

@autobind
export default class PostStore {
	@observable postList: IPostListTypes[] = [];
	@observable postInfo: IPostListTypes = {};
	@observable isLoading: boolean = true;

	@action
	handlePostList = async () => {
		this.isLoading = true;
		try {
			const response: IPostResponseListTypes = await getResponse('/post');

			this.postList = response.data.posts.sort(
				(a: IPostListTypes, b: IPostListTypes) => {
					if (a.created_at! > b.created_at!) {
						return -1;
					}
					return 0;
				}
			);

			this.isLoading = false;
			return response;
		} catch (error) {
			this.isLoading = false;
			throw error;
		}
	};

	@action
	handlePostView = async (idx: number) => {
		try {
			this.isLoading = true;
			const response: IPostResponseTypes = await getResponse(`/post/${idx}`);
			this.postInfo = response.data.post;

			this.isLoading = false;
			return response;
		} catch (error) {
			this.isLoading = false;
			throw error;
		}
	};

	@action
	handleSearchPosts = async (keyword: string) => {
		try {
			const response: IPostResponseListTypes = await getResponse(
				`/post/search?keyword=${keyword}`
			);
			this.postList = response.data.posts;

			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleWritePost = async (request: IPostRequestTypes) => {
		try {
			const response: ISuccessTypes = await postRequest(
				'/post',
				request,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleModifyPost = async (request: IPostRequestTypes) => {
		try {
			const response: ISuccessTypes = await modifyRequest(
				'/post',
				request,
				getUserToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handleDeletePost = async (idx: number) => {
		try {
			const response: ISuccessTypes = await deleteRequest(
				`/post?idx=${idx}`,
				getUserToken()
			);
			if (response.status === 200) {
				this.postList = this.postList.filter(
					(post: IPostListTypes) => post.idx !== idx
				);
			}

			return response;
		} catch (error) {
			throw error;
		}
	};
}
