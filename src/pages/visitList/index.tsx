import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { PageInfo } from '@utils/types';
import { getUserVisitList } from '@services/user';
import { IEmoj } from '@interface/emoj';
import EmojItem from '@components/EmojItem';
import FlatList from '@components/FlatList';
import { useCallback } from 'react';
import styles from './index.module.scss';

const Component = () => {
  const fetchList = useCallback((data: PageInfo) => {
    return getUserVisitList<IEmoj>(data);
  }, []);

  return (
    <View className={styles.container}>
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
