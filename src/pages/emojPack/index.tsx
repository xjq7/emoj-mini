import { View, Text } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { getEmojListByGroup } from '@services/emoj';
import { IEmoj, IEmojGroup } from '@interface/emoj';
import FlatList from '@components/FlatList';
import { useCallback } from 'react';
import EmojItem from '@components/EmojItem';
import { Icon } from '@antmjs/vantui';
import styles from './index.module.scss';

export interface IGroupItem {
  emojList: IEmoj[];
  groupInfo: IEmojGroup;
}

const Component = () => {
  const fetchList = useCallback((o: any) => {
    return getEmojListByGroup(o);
  }, []);

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '表情包集合',
      path: '/pages/emojPack/index',
    };
  });

  const renderItem = (item) => {
    const { emojList, groupInfo } = item;
    const { name = '' } = groupInfo || {};

    return (
      <View
        className={styles.item}
        onClick={() => {
          Taro.navigateTo({
            url: '/pages/emojDetail/index?id=' + emojList[0].id,
          });
        }}
      >
        <View className={styles.header}>
          <Text className={styles.title}>{name}</Text>
          <View className={styles.more}>
            <Text className={styles.more_label}>更多</Text>
            <Icon name="arrow" size={24} />
          </View>
        </View>
        <View className={styles.content}>
          {emojList.map((item: IEmoj, index) => {
            return <EmojItem className={styles.emoj} key={index} {...item} />;
          })}
        </View>
      </View>
    );
  };

  return (
    <View className={styles.container}>
      <FlatList fetchMethod={fetchList} renderItem={renderItem} />
    </View>
  );
};

export default Component;
