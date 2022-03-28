import { View } from '@tarojs/components';
import Taro, { useReachBottom } from '@tarojs/taro';
import { Search } from '@antmjs/vantui';
import { useState } from 'react';
import useList from '@hooks/useList';
import { getEmojList } from '@services/emoj';
import EmojList from '@components/EmojList';
import styles from './index.module.scss';

const Component = () => {
  const [keyword, setKeyword] = useState('');

  const fetchList = (data) => {
    const params = data;
    if (keyword) params.name = keyword;
    return getEmojList(params);
  };

  const { list, hasMore, loading, refresh, loadMore } = useList({ fetchMethod: fetchList });

  const handleChange = (e) => {
    setKeyword(e.detail.trim());
  };

  const handleSearch = async () => {
    await refresh();
    Taro.pageScrollTo({
      scrollTop: 0,
    });
  };

  useReachBottom(() => {
    loadMore();
  });

  return (
    <View className={styles.container}>
      <View className={styles.search}>
        <Search
          value={keyword}
          placeholder="请输入搜索关键词"
          onChange={handleChange}
          onSearch={handleSearch}
          renderAction={
            <View
              onClick={async () => {
                await refresh();
                Taro.pageScrollTo({
                  scrollTop: 0,
                });
              }}
            >
              搜索
            </View>
          }
        />
      </View>

      <EmojList dataSource={list} loading={loading} hasMore={hasMore}></EmojList>
    </View>
  );
};

export default Component;
