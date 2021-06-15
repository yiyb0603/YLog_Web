import { autobind } from 'core-decorators';
import { IMemberTypes } from 'interface/MemberTypes';
import { IProfileModifyDto } from 'interface/ProfileTypes';
import { getResponse, modifyRequest } from 'lib/Axios';
import { action, observable } from 'mobx';
import SecureLS from 'secure-ls';
import { getUserToken } from 'Token/Token';

@autobind
export default class ProfileStore {
  @observable userInfo: IMemberTypes = {
    idx: 0,
    name: '',
    email: '',
    is_admin: false,
    profile_image: '',
  };

  @action
  handleGetProfile = async (userIdx: number) => {
    try {
      const ls: SecureLS = new SecureLS({ encodingType: 'aes' });
      const response = await getResponse(`/profile?userIdx=${userIdx}`, getUserToken());
      this.userInfo = response.data.user;
      ls.set('userInfo', this.userInfo);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @action
  handleModifyProfile = async (request: IProfileModifyDto) => {
    try {
      const response = await modifyRequest('/profile', request, getUserToken());
      return response;
    } catch (error) {
      throw error;
    }
  }
}