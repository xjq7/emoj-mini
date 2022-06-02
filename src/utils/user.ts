import Taro from '@tarojs/taro';
import { login as loginService } from '@services/user';
import userStore from '../store/user';

export function login() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          loginService({ code: res.code })
            .then((userInfo: any) => {
              const { token } = userInfo;
              userStore.login(userInfo);
              Taro.setStorageSync('token', token);
              Taro.setStorageSync('userInfo', JSON.stringify(userInfo));
              resolve(userInfo);
            })
            .catch((err) => reject(err));
        } else {
          reject();
        }
      },
    });
  });
}
