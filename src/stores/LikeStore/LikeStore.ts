import { autobind } from 'core-decorators';
import { ILikeResponseTypes, ILikeTypes } from 'interface/LikeTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { deleteRequest, getResponse, postRequest } from 'lib/Axios';
import { observable, action } from 'mobx';
import { getUserToken } from 'Token/Token';

@autobind
export default class LikeStore {
  @observable likeList: ILikeTypes[] = [];

  @action
  handleLikeList = async (postIdx: number) => {
    try {
      this.likeList = [];
      const response: ILikeResponseTypes = await getResponse(`/like/${postIdx}`);
      this.likeList = response.data.likes;

      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handlePostLike = async (postIdx: number) => {
    try {
      const response: ISuccessTypes = await postRequest('/like', { postIdx }, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleDeleteLike = async (likeIdx: number) => {
    try {
      const response: ISuccessTypes = await deleteRequest(`/like?likeIdx=${likeIdx}`, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }
}