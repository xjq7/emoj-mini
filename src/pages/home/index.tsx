import { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { Tabs } from '@taroify/core';
import { useReachBottom } from '@tarojs/taro';
import request from '@utils/request';
import EmojList from '@components/EmojList';

import styles from './index.module.scss';

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

enum Tab {
  hot = 'hot',
  new = 'new',
}

const initPageInfo = { page: 1, pageSize: 18, total: 0 };

const Index = inject('store')(
  observer((props) => {
    const {
      counterStore: { counter },
    } = props.store;

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageInfo, setPageInfo] = useState(initPageInfo);

    const [currentTab, setCurrentTab] = useState<Tab>(Tab.hot);

    const fetchList = async (page: number = 1, pageSize: number = 18) => {
      setLoading(true);
      return request({
        url: '/emoj/list',
        method: 'POST',
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
          setList(list.concat(data));
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

    useEffect(() => {
      setList([]);
      fetchList();
    }, [currentTab]);

    const onTabChange = (tab) => {
      setCurrentTab(tab);
    };

    return (
      <View className={styles.container}>
        <Tabs className="tabs" value={currentTab} onChange={onTabChange} sticky>
          <Tabs.TabPane title="热门" value={Tab.hot}>
            <EmojList dataSource={list} hasMore={hasMore} />
          </Tabs.TabPane>
          <Tabs.TabPane title="最新" value={Tab.new}>
            <EmojList dataSource={list} hasMore={hasMore} />
          </Tabs.TabPane>
        </Tabs>
      </View>
    );
  }),
);

export default Index;
