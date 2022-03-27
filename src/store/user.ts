import { action, observable } from 'mobx';

class UserStore {
  @observable isLogin = false;
  @observable userInfo = {};

  @action.bound
  login(userInfo) {
    this.userInfo = userInfo;
    this.isLogin = true;
  }
  logout() {
    this.isLogin = false;
    this.userInfo = {};
  }
}

export default new UserStore();
