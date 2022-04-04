import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { View } from '@tarojs/components';
import useList from '@hooks/useList';
import { ListResponse } from '@interface/common';
import ListFooter from '@components/ListFooter';
import classnames from 'classnames';
import { useEffect } from 'react';
import styles from './index.module.scss';

interface Props<T> {
  fetchMethod(o: any): Promise<ListResponse<T>>;
  renderItem(item: T, index: number): JSX.Element;
  style?: any;
  className?: any;
  autoGoToTop?: boolean;
  ref?: any;
  enabledPullDownRefresh?: boolean;
  containerStyle?: any;
}

function Component<T>(props: Props<T>) {
  const {
    fetchMethod,
    renderItem,
    style,
    className,
    autoGoToTop = true,
    enabledPullDownRefresh = true,
    containerStyle = {},
  } = props;
  const { list, loadMore, loading, hasMore, refresh } = useList<T>({ fetchMethod });

  useReachBottom(() => {
    loadMore();
  });

  usePullDownRefresh(() => {
    if (enabledPullDownRefresh) refresh();
  });

  useEffect(() => {
    if (autoGoToTop) {
      Taro.pageScrollTo({
        scrollTop: 0,
      });
    }
  }, [fetchMethod]);

  return (
    <View className={classnames(styles.container, containerStyle)}>
      <View className={classnames(styles.list, className)} style={style}>
        {list.map((item: T, index) => {
          return renderItem(item, index);
        })}
      </View>
      <ListFooter hasMore={hasMore} loading={loading} />
    </View>
  );
}

export default Component;
