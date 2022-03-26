import { View, Text } from '@tarojs/components';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import request from '@utils/request';
import EmojList from '@components/EmojList';
import themeMap from '@utils/theme';
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

const initPageInfo = { page: 1, pageSize: 18, total: 0 };

const Index = inject('store')(
  observer((props) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [pageInfo, setPageInfo] = useState(initPageInfo);

    const [currentTab, setCurrentTab] = useState<Tab>(Tab.hot);

    const fetchList = async (page: number = 1, pageSize: number = 18) => {
      setLoading(true);
      return request({
        url: '/emoj/list',
        method: 'GET',
        data: {
          type: currentTab,
          page,
          pageSize,
        },
      })
        .then((res: any) => {
          const { list: data, ...resPageInfo } = res;
          if (resPageInfo.page * resPageInfo.pageSize < resPageInfo.total) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          setPageInfo(resPageInfo);
          if (page === 1) {
            Taro.pageScrollTo({ scrollTop: 0 });
            setList(data);
          } else {
            setList(list.concat(data));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      fetchList();
    }, []);

    useReachBottom(() => {
      fetchList(pageInfo.page + 1, pageInfo.pageSize);
    });

    usePullDownRefresh(() => {
      fetchList(1);
    });

    useEffect(() => {
      fetchList();
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
