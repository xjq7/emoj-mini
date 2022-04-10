import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Search } from '@antmjs/vantui';
import { useCallback, useState } from 'react';
import { getEmojList } from '@services/emoj';
import { IEmoj } from '@interface/emoj';
import EmojItem from '@components/EmojItem';
import FlatList from '@components/FlatList';
import PageView from '@components/PageView';
import styles from './index.module.scss';

const Component = () => {
  const [keyword, setKeyword] = useState('');
  const [listParams, setListParamsd] = useState({});

  const fetchList = useCallback(
    (data) => {
      return getEmojList({ ...data, ...listParams }).then((res) => ({
        ...res,
        list: res.list?.reduce((acc: IEmoj[][], cur: IEmoj, index: number) => {
          if (index % 3 === 0) {
            acc.push([cur]);
          } else {
            acc[acc.length - 1].push(cur);
          }
          return acc;
        }, []),
      }));
    },
    [listParams],
  );

  const handleChange = (e) => {
    setKeyword(e.detail.trim());
  };

  const handleSearch = async () => {
    const params: any = {};
    if (keyword) {
      params.name = keyword;
    }
    setListParamsd(params);
  };

  const renderItem = (list) => {
    return (
      <View className={styles.item_list}>
        {list.map((item) => {
          return (
            <EmojItem
              key={item.id}
              {...item}
              onPress={() => {
                Taro.navigateTo({
                  url: '/pages/emojDetail/index?id=' + item.id,
                });
              }}
            ></EmojItem>
          );
        })}
      </View>
    );
  };

  return (
    <PageView className={styles.container}>
      <View className={styles.search}>
        <Search
          value={keyword}
          placeholder="请输入搜索关键词"
          onChange={handleChange}
          onSearch={handleSearch}
          renderAction={<View onClick={handleSearch}>搜索</View>}
        />
      </View>
      <FlatList<IEmoj[]> fetchMethod={fetchList} renderItem={renderItem} />
    </PageView>
  );
};

export default Component;
