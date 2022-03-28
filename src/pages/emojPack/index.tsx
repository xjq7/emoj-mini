import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import useList from '@hooks/useList';
import { getEmojListByGroup } from '@services/emoj';
import { IEmoj, IEmojGroup } from '@interface/emoj';
import styles from './index.module.scss';
import GroupItem from './components/GroupItem';

interface IGroupItem {
  emojList: IEmoj[];
  groupInfo: IEmojGroup;
}

const Component = () => {
  const { list, loadMore, loading, hasMore, refresh } = useList<IGroupItem>({ fetchMethod: getEmojListByGroup });

  useReachBottom(() => {
    loadMore();
  });

  usePullDownRefresh(() => {
    refresh();
  });

  return (
    <View className={styles.container}>
      {list.map((item) => (
        <GroupItem />
      ))}
    </View>
  );
};

export default Component;
