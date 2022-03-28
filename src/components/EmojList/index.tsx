import { View, Text } from '@tarojs/components';
import EmojItem from '@components/EmojItem';
import styles from './index.module.scss';

const Component = (props) => {
  const { dataSource, hasMore, onPress, loading, style } = props;
  return (
    <View className={styles.container} style={style}>
      <View className={styles.list}>
        {dataSource.map((item: any = {}, index) => {
          return <EmojItem key={item.id} {...item} index={index} onPress={onPress} />;
        })}
      </View>
      {(hasMore || loading) && <Text className={styles.loading}>加载中...</Text>}
      {!hasMore && !loading && <Text className={styles.loading}>到底了</Text>}
    </View>
  );
};

export default Component;
