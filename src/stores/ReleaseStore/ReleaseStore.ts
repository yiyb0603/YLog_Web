import { autobind } from 'core-decorators';
import { IReleaseListResponseTypes, IReleaseRequestTypes, IReleaseResponseTypes, IReleaseTypes } from 'interface/ReleaseTypes';
import ISuccessTypes from 'interface/SuccessTypes';
import { deleteRequest, getResponse, modifyRequest, postRequest } from 'lib/Axios';
import { action, observable } from 'mobx';
import { getUserToken } from 'Token/Token';

@autobind
export default class ReleaseStore {
  @observable isLoading: boolean = true;
  @observable releaseList: IReleaseTypes[] = [];
  @observable releaseInfo: IReleaseTypes = {};

  @action
  handleReleaseList = async () => {
    try {
      const response: IReleaseListResponseTypes = await getResponse('/release');
      const { releases } = response.data;

      this.releaseList = releases.sort((a: IReleaseTypes, b: IReleaseTypes) => {
        if (a.created_at! > b.created_at!) {
          return -1;
        }

        return 0;
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleReleaseView = async (idx: number) => {
    try {
      this.isLoading = true;
      const response: IReleaseResponseTypes = await getResponse(`/release/${idx}`);
      this.releaseInfo = response.data.release;

      return response;
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  handleCreateRelease = async (request: IReleaseRequestTypes) => {
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