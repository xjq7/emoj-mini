import { View, Text } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { useCallback, useState } from 'react';
import { observer, inject } from 'mobx-react';
import themeMap from '@utils/theme';
import { Icon } from '@antmjs/vantui';
import FlatList from '@components/FlatList';
import { IEmoj } from '@interface/emoj';
import EmojItem from '@components/EmojItem';
import { getEmojList } from '@services/emoj';
import styles from './index.module.scss';

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

enum Tab {
  hot = 'hot',
  new = 'new',
}

const Index = inject('store')(
  observer((props) => {
    const [currentTab, setCurrentTab] = useState<Tab>(Tab.hot);

    const fetchList = useCallback(
      async (data: any) => {
        return getEmojList({ ...data, type: currentTab });
      },
      [currentTab],
    );

    useShareAppMessage((res) => {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '表情包集合',
        path: '/pages/home/index',
      };
    });

    return (
      <View className={styles.container}>
        <View className={styles.tabs}>
          <View className={styles.tab}>
            <Text
              className={styles.label}
              style={{ borderColor: currentTab === Tab.hot ? themeMap.$Primary : themeMap.$White }}
              onClick={() => {
                setCurrentTab(Tab.hot);
              }}
            >
              热门
            </Text>
          </View>
          <View className={styles.tab}>
            <Text
              className={styles.label}
              style={{ borderColor: currentTab === Tab.new ? themeMap.$Primary : themeMap.$White }}
              onClick={() => {
                setCurrentTab(Tab.new);
              }}
            >
              最新
            </Text>
          </View>
        </View>
        <FlatList<IEmoj>
          className={styles.list}
          fetchMethod={fetchList}
          renderItem={(item) => (
            <EmojItem
              {...item}
              onPress={() => {
                Taro.navigateTo({
                  url: '/pages/emojDetail/index?id=' + item.id,
                });
              }}
            />
          )}
        />
        <View
          className={styles.search}
          onClick={() => {
            Taro.navigateTo({ url: '/pages/emojSearch/index' });
          }}
        >
          <Icon classPrefix="icon" name="iconfontzhizuobiaozhun023131" size={50} color={themeMap.$White} />
        </View>
      </View>
    );
  }),
);

export default Index;
