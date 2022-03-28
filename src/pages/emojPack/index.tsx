import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import useList from '@hooks/useList';
import { getEmojListByGroup } from '@services/emoj';
import styles from './index.module.scss';

const Component = () => {
  const { list, loadMore, loading, hasMore, refresh } = useList({ fetchMethod: getEmojListByGroup });

  useReachBottom(() => {
    loadMore();
  });

  usePullDownRefresh(() => {
    refresh();
  });

  return <View className={styles.container}></View>;
};

export default Component;
