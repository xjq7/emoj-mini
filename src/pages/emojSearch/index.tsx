import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Search } from '@antmjs/vantui';
import { useCallback, useState } from 'react';
import { getEmojList } from '@services/emoj';
import { IEmoj } from '@interface/emoj';
import EmojItem from '@components/EmojItem';
import FlatList from '@components/FlatList';
import styles from './index.module.scss';

const Component = () => {
  const [keyword, setKeyword] = useState('');
  const [listParams, setListParamsd] = useState({});

  const fetchList = useCallback(
    (data) => {
      return getEmojList({ ...data, ...listParams });
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

  return (
    <View className={styles.container}>
      <View className={styles.search}>
        <Search
          value={keyword}
          placeholder="请输入搜索关键词"
          onChange={handleChange}
          onSearch={handleSearch}
          renderAction={<View onClick={handleSearch}>搜索</View>}
        />
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
    </View>
  );
};

export default Component;
