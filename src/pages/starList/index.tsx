import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { PageInfo } from '@utils/types';
import { getUserStarList } from '@services/user';
import { IEmoj } from '@interface/emoj';
import FlatList from '@components/FlatList';
import EmojItem from '@components/EmojItem';
import { useCallback } from 'react';
import styles from './index.module.scss';

const Component = () => {
  const fetchList = useCallback((data: PageInfo) => {
    return getUserStarList<IEmoj>(data).then((res) => ({
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
  }, []);

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
    <View className={styles.container}>
      <FlatList<IEmoj[]> fetchMethod={fetchList} renderItem={renderItem} />
    </View>
  );
};

export default Component;
