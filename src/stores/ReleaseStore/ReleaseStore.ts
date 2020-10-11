import { autobind } from 'core-decorators';
import { IReleaseListResponseTypes, IReleaseResponseTypes, IReleaseTypes } from 'interface/ReleaseTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { deleteRequest, getResponse, modifyRequest, postRequest } from 'lib/Axios';
import { action } from 'mobx';
import { getUserToken } from 'Token/Token';

@autobind
export default class ReleaseStore {

  @action
  handleReleaseList = async () => {
    try {
      const response: IReleaseListResponseTypes = await getResponse('/release');
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleReleaseView = async (idx: number) => {
    try {
      const response: IReleaseResponseTypes = await getResponse(`/release/${idx}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleCreateRelease = async (request: IReleaseTypes) => {
    try {
      const response: ISuccessTypes = await postRequest('/release', request, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleModifyRelease = async (request: IReleaseTypes) => {
    try {
      const response: ISuccessTypes = await modifyRequest('/release', request, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleDeleteRelease = async (idx: number) => {
    try {
      const response: ISuccessTypes = await deleteRequest(`/release?idx=${idx}`, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }
}