import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';

import './index.scss';

type PageStateProps = {
  store: {
    counterStore: {
      counter: number;
      increment: Function;
      decrement: Function;
      incrementAsync: Function;
    };
  };
};

interface Index {
  props: PageStateProps;
}

const Index = inject('store')(
  observer((props) => {
    const {
      counterStore: { counter },
    } = props.store;
    const increment = () => {
      const { counterStore } = props.store;
      counterStore.increment();
    };

    const decrement = () => {
      const { counterStore } = props.store;
      counterStore.decrement();
    };

    const incrementAsync = () => {
      const { counterStore } = props.store;
      counterStore.incrementAsync();
    };

    return (
      <View className="index">
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    );
  }),
);

export default Index;
