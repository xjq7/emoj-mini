import Taro from '@tarojs/taro';
import { action, observable } from 'mobx';

class UserStore {
  @observable isLogin = false;
  @observable userInfo = {};

  @action.bound
  login(userInfo) {
    this.userInfo = userInfo;
    this.isLogin = true;
  }

  @action.bound
  updateUserInfo(userInfo = {}) {
    this.userInfo = { ...this.userInfo, ...userInfo };
  }

  @action.bound
  logout() {
    Taro.clearStorageSync();
    this.isLogin = false;
    this.userInfo = {};
  }
}

export default new UserStore();
