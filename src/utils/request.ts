import Taro from '@tarojs/taro';
import userStore from '../store/user';

const URL = 'https://c.xjq.icu';
const LURL = 'http://127.0.0.1:39002';

const ENV = process.env.NODE_ENV;

const request = ({ url, method, data, header = {}, timeout = 10000 }) => {
  const token = Taro.getStorageSync('token');

  if (token) {
    header = { ...header, Authorization: `Bearer ${token}` };
  }

  return new Promise((r, j) => {
    Taro.request({
      url: (ENV === 'development' ? LURL : URL) + url,
      method,
      data,
      header,
      timeout,
      success: (res) => {
        const { code, message } = res.data;
        if (code === 2) {
          // userStore.logout();
          // Taro.navigateTo({
          //   url: '/pages/login/index',
          // });
          // j();
          Taro.showToast({
            title: message,
            icon: 'error',
            duration: 2000,
          });
        } else {
          r(res.data.data);
        }
      },
      fail: (err) => {
        Taro.showToast({
          title: err.errMsg,
          icon: 'none',
        });
        j(err);
      },
    });
  });
};

export default request;
