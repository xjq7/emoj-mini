import { Provider } from 'mobx-react';
import { useEffect } from 'react';
import { login } from '@utils/user';
import userStore from './store/user';
import './app.scss';

const store = {
  userStore,
};

function App(props) {
  useEffect(() => {
    login();
  }, []);
  return <Provider store={store}>{props.children}</Provider>;
}

export default App;
