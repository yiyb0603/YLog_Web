import { autobind } from 'core-decorators';
import { IToken, IUser } from 'interface/AuthTypes';
import { IProfileModifyDto } from 'interface/ProfileTypes';
import { getResponse, modifyRequest } from 'lib/Axios';
import { action, observable } from 'mobx';
import SecureLS from 'secure-ls';
import { getUserToken } from 'Token';

@autobind
export default class ProfileStore {
  @observable userInfo: IToken = {
    idx: 0,
    name: '',
    email: '',
    isAdmin: false,
    profileImage: '',
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