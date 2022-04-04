import { Text } from '@tarojs/components';
import styles from './index.module.scss';

interface Props {
  hasMore: boolean;
  loading: boolean;
}

const Component = (props: Props) => {
  const { hasMore = true, loading = false } = props;
  return (
    <>
      {hasMore && <Text className={styles.loading}>加载中...</Text>}
      {!hasMore && !loading && <Text className={styles.footer}>到底了</Text>}
    </>
  );
};

export default Component;
