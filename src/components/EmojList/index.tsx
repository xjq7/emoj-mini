import { View, Text } from '@tarojs/components';
import EmojItem from '@components/EmojItem';
import styles from './index.module.scss';

const Component = (props) => {
  const { dataSource, hasMore } = props;
  return (
    <View className={styles.container}>
      {dataSource.map((item: any, index) => {
        return <EmojItem key={item.id} {...item} index={index} />;
      })}
      {hasMore && <Text className={styles.loading}>加载中...</Text>}
    </View>
  );
};

export default Component;
