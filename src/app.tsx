import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import request from '@utils/request';
import userStore from './store/user';
import './app.scss';

const store = {
  userStore,
};

function App(props) {
  useEffect(() => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          request({
            url: '/user/login',
            method: 'POST',
            data: {
              code: res.code,
            },
          }).then((userInfo: any) => {
            const { token } = userInfo;
            userStore.login(userInfo);
            Taro.setStorageSync('token', token);
            Taro.setStorageSync('userInfo', JSON.stringify(userInfo));
          });
        }
      },
    });
  }, []);
  return <Provider store={store}>{props.children}</Provider>;
}

export default App;
