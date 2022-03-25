import { observable } from 'mobx';

const userStore = observable({
  isLogin: false,
  userInfo: {},
  login(userInfo) {
    this.userInfo = userInfo;
    this.isLogin = true;
  },
  logout() {
    this.isLogin = false;
    this.userInfo = {};
  },
});

export default userStore;
