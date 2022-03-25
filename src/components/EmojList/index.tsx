import { View, Text } from '@tarojs/components';
import EmojItem from '@components/EmojItem';
import styles from './index.module.scss';

const Component = (props) => {
  const { dataSource, hasMore, onPress } = props;
  return (
    <View className={styles.container}>
      {dataSource.map((item: any, index) => {
        return <EmojItem key={item.id} {...item} index={index} onPress={onPress} />;
      })}
      {hasMore && <Text className={styles.loading}>加载中...</Text>}
    </View>
  );
};

export default Component;
