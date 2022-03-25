import Taro from '@tarojs/taro';
import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import counterStore from './store/counter';
import userStore from './store/user';

import './app.scss';

const store = {
  counterStore,
  userStore,
};

function App(props) {
  useEffect(() => {
    try {
      var value = Taro.getStorageSync('token');
      if (value) {
        // Do something with return value
      } else {
        Taro.navigateTo({
          url: '/pages/login/index',
        });
      }
    } catch (e) {
      // Do something when catch error
    }
  }, []);

  return <Provider store={store}>{props.children}</Provider>;
}

export default App;
