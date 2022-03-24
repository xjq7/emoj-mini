import { useState } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { Tabs } from '@taroify/core';
import EmojItem from '@components/EmojItem';

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

    const [currentTab, setCurrentTab] = useState(0);

    return (
      <View className="index">
        <Tabs value={currentTab} onChange={setCurrentTab}>
          <Tabs.TabPane title="热门" value={0}>
            <EmojItem />
          </Tabs.TabPane>
          <Tabs.TabPane title="最新" value={1}>
            内容 2
          </Tabs.TabPane>
        </Tabs>
      </View>
    );
  }),
);

export default Index;
