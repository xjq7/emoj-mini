import Taro from '@tarojs/taro';
import { login } from '@utils/user';
import { URL } from './config';

const request = ({ url, method, data, header = {}, timeout = 10000 }) => {
  const token = Taro.getStorageSync('token');

  if (token) {
    header = { ...header, Authorization: `Bearer ${token}` };
  }

  return new Promise((r, j) => {
    Taro.request({
      url: URL + url,
      method,
      data,
      header,
      timeout,
      success: (res) => {
        const { code, message } = res.data;
        if (code === 2) {
          login();
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
