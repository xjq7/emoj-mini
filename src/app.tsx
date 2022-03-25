import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import counterStore from './store/counter';

import './app.scss';

const store = {
  counterStore,
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
