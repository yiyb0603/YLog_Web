import { autobind } from 'core-decorators';
import { IReleaseListResponse, IReleaseDto, IReleaseResponse, IRelease } from 'interface/ReleaseTypes';
import ISuccess from 'interface/SuccessTypes';
import { deleteRequest, getResponse, modifyRequest, postRequest } from 'lib/Axios';
import { action, observable } from 'mobx';
import { getUserToken } from 'Token';

@autobind
export default class ReleaseStore {
  @observable isLoading: boolean = true;
  @observable releaseList: IRelease[] = [];
  @observable releaseInfo: IRelease = {};

  @action
  handleReleaseList = async () => {
    try {
      const response: IReleaseListResponse = await getResponse('/release');
      const { releases } = response.data;

      this.releaseList = releases.sort((a: IRelease, b: IRelease) => {
        if (a.createdAt! > b.createdAt!) {
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
      const response: IReleaseResponse = await getResponse(`/release/${idx}`);
      this.releaseInfo = response.data.release;

      return response;
    } catch (error) {
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  handleCreateRelease = async (request: IReleaseDto) => {
    try {
      const response: ISuccess = await postRequest('/release', request, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleModifyRelease = async (request: IRelease) => {
    try {
      const response: ISuccess = await modifyRequest('/release', request, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleDeleteRelease = async (idx: number) => {
    try {
      const response: ISuccess = await deleteRequest(`/release?idx=${idx}`, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }
}