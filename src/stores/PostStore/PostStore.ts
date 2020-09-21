import { autobind } from 'core-decorators';
import {
	IPostListTypes,
	IPostRequestTypes,
	IPostResponseListTypes,
	IPostResponseTypes,
} from 'interface/PostTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { getResponse, postRequest } from 'lib/Axios';
import { getToken } from 'lib/Token';
import { observable, action } from 'mobx';

@autobind
export default class PostStore {
	@observable postList: IPostListTypes[] = [];

	@action
	handlePostList = async () => {
		try {
			const response: IPostResponseListTypes = await getResponse('/post');
			this.postList = response.data.posts;
			return response;
		} catch (error) {
			throw error;
		}
	};

	@action
	handlePostView = async (idx: number) => {
		try {
			console.log(idx);
			const response: IPostResponseTypes = await getResponse(`/post/${idx}`);
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
				getToken()
			);
			return response;
		} catch (error) {
			throw error;
		}
	};
}
