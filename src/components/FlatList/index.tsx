import { useReachBottom } from '@tarojs/taro';
import useList from '@hooks/useList';
import { ListResponse } from '@interface/common';
import classnames from 'classnames';
import { PowerScrollView } from '@antmjs/vantui';
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
  const { fetchMethod, renderItem, style, className, ...restProps } = props;
  const { list, loadMore, loading, refresh, hasMore, pageInfo } = useList<T>({ fetchMethod });

  useReachBottom(() => {
    loadMore();
  });

  return (
    <PowerScrollView
      className={classnames(styles.container, className)}
      style={style}
      finishedText="到底了"
      successText="刷新成功"
      onScrollToUpper={refresh}
      onScrollToLower={loadMore}
      current={list.length}
      finished={!hasMore}
      total={pageInfo.total}
      pageSize={pageInfo.pageSize}
      emptyDescription="空空如也~"
      {...restProps}
    >
      {list.map((item, i) => renderItem(item, i))}
    </PowerScrollView>
  );
}

export default Component;
