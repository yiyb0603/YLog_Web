import { autobind } from 'core-decorators';
import { ILikeResponse, ILike } from 'interface/LikeTypes';
import ISuccess from 'interface/SuccessTypes';
import { deleteRequest, getResponse, postRequest } from 'lib/Axios';
import { observable, action } from 'mobx';
import { getUserToken } from 'Token';

@autobind
export default class LikeStore {
  @observable likeList: ILike[] = [];

  @action
  handleLikeList = async (postIdx: number) => {
    try {
      this.likeList = [];
      const response: ILikeResponse = await getResponse(`/like/${postIdx}`);
      this.likeList = response.data.likes;

      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handlePostLike = async (postIdx: number) => {
    try {
      const response: ISuccess = await postRequest('/like', { postIdx }, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleDeleteLike = async (likeIdx: number) => {
    try {
      const response: ISuccess = await deleteRequest(`/like?likeIdx=${likeIdx}`, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }
}