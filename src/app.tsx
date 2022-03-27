import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import userStore from './store/user';

import './app.scss';

const store = {
  userStore,
};

function App(props) {
  useEffect(() => {
    try {
      const userInfo = Taro.getStorageSync('userInfo');
      if (userInfo) {
        userStore.login(JSON.parse(userInfo));
      }
    } catch (error) {}
  }, []);
  return <Provider store={store}>{props.children}</Provider>;
}

export default App;
