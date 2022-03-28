import { View, Text } from '@tarojs/components';
import Taro, { usePullDownRefresh, useReachBottom, useShareAppMessage } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import EmojList from '@components/EmojList';
import themeMap from '@utils/theme';
import useList from '@hooks/useList';
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

    const fetchList = async (data: any) => {
      return getEmojList({ ...data, type: currentTab });
    };

    const { loading, list, refresh, loadMore, hasMore } = useList({ fetchMethod: fetchList });

    useReachBottom(() => {
      loadMore();
    });

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

    usePullDownRefresh(() => {
      refresh();
    });

    useEffect(() => {
      refresh();
    }, [currentTab]);

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
        <View style={{ height: 56 }} />
        <EmojList
          loading={loading}
          dataSource={list}
          hasMore={hasMore}
          onPress={({ id }) => {
            Taro.navigateTo({
              url: '/pages/emojDetail/index?id=' + id,
            });
          }}
        />
      </View>
    );
  }),
);

export default Index;
