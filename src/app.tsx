import { Provider } from 'mobx-react';
import userStore from './store/user';

import './app.scss';

const store = {
  userStore,
};

function App(props) {
  return <Provider store={store}>{props.children}</Provider>;
}

export default App;
