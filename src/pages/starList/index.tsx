import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import EmojList from '@components/EmojList';
import useList from '@hooks/useList';
import { PageInfo } from '@utils/types';
import { getUserStarList } from '@services/user';
import { IEmoj } from '@interface/emoj';
import styles from './index.module.scss';

const Component = () => {
  const fetchList = (data: PageInfo) => {
    return getUserStarList<IEmoj>(data);
  };

  const { loading, list, refresh, loadMore, hasMore } = useList({ fetchMethod: fetchList });

  usePullDownRefresh(() => {
    refresh();
  });

  useReachBottom(() => {
    loadMore();
  });

  return (
    <View className={styles.container}>
      <EmojList dataSource={list} loading={loading} hasMore={hasMore} />
    </View>
  );
};

export default Component;
